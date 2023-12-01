import { paginateArray } from '@common/utils'
import { Config, ENV } from '@config/index'
import { BlockchainService } from '@features/blockchain/services'
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PaginationWithBlockIdDto } from '../dto'
import { Axios } from 'axios'
import {
  AXIOS_INSTANCE,
  PaginationDto,
  PaginationResult,
  Payload,
  Transaction,
  TransactionWithStatus,
  createPaginationResult
} from '@epimon/common'

@Injectable()
export class TransactionService {
  constructor(
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios,
    @Inject(ENV) private readonly config: Config,
    private readonly blockchainService: BlockchainService
  ) {}

  public async getAllTransactions(blockId?: string): Promise<TransactionWithStatus[]> {
    const txsEndpoint = this.config.ROOT_NODE_URI + '/transactions/pool'
    const txsRequest = await this.axios.get<Payload<Transaction[]>>(txsEndpoint)

    if (txsRequest.status !== HttpStatus.OK) {
      throw new NotFoundException('No transactions found.')
    }

    const blocks = await this.blockchainService.getBlocks({})
    if (blockId) {
      blocks.records = blocks.records.filter((block) => block._id === blockId)
    }

    let transactions = blocks.records
      .flatMap((block) => block.transactions)
      .map((tx) => {
        return { ...tx, isConfirmed: true }
      })

    if (!blockId) {
      const txPool = txsRequest.data.data.map((tx) => {
        return { ...tx, isConfirmed: false }
      })
      transactions = transactions.concat(txPool)
    }
    return transactions.sort((a, b) => b.timestamp - a.timestamp)
  }

  public async getTransactions({
    page,
    limit,
    blockId
  }: PaginationWithBlockIdDto): Promise<PaginationResult<TransactionWithStatus[]>> {
    const transactions = await this.getAllTransactions(blockId)
    const paginatedTransactions = paginateArray(transactions, { page, limit })

    return createPaginationResult<TransactionWithStatus>(
      paginatedTransactions,
      page,
      limit,
      transactions.length
    )
  }

  public async getTransactionById(id: string): Promise<TransactionWithStatus> {
    const transactions = await this.getAllTransactions()
    const transaction = transactions.find((transaction) => transaction._id === id)

    if (!transaction) {
      throw new NotFoundException('Transaction not found.')
    }
    return transaction
  }

  public async getTransactionsOfWallet(
    walletAddress: string,
    { page, limit }: PaginationDto
  ): Promise<PaginationResult<Transaction[]>> {
    const transactions = await this.getAllTransactions()
    const transactionsOfWallet = transactions.filter(
      (transaction) =>
        transaction.receiverAddress === walletAddress || transaction.senderAddress === walletAddress
    )
    const paginatedTransactionsOfWallet = paginateArray(transactionsOfWallet, { page, limit })

    if (!transactionsOfWallet.length) {
      throw new BadRequestException('No transactions found for address.')
    }

    return createPaginationResult(
      paginatedTransactionsOfWallet,
      page,
      limit,
      transactionsOfWallet.length
    )
  }
}
