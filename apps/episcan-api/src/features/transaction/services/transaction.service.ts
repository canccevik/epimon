import { paginateArray } from '@common/utils'
import { Config, ENV } from '@config/index'
import { BlockchainService } from '@features/blockchain/services'
import { CreateTransactionDto, PaginationWithBlockIdDto } from '../dto'
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
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

  public async createTransaction(
    transaction: CreateTransactionDto,
    privateKey: string
  ): Promise<Transaction> {
    const createTxEndpoint = this.config.ROOT_NODE_URI + '/transactions'
    const createTxRequest = await this.axios.post<Payload<Transaction>>(
      createTxEndpoint,
      transaction,
      { headers: { 'x-private-key': privateKey } }
    )

    if (createTxRequest.status !== HttpStatus.CREATED) {
      throw new BadRequestException(createTxRequest.data.message)
    }
    return createTxRequest.data.data
  }

  public async getAllTransactions(blockId?: string): Promise<TransactionWithStatus[]> {
    const txsEndpoint = this.config.ROOT_NODE_URI + '/transactions/pool'
    const txsRequest = await this.axios.get<Payload<Transaction[]>>(txsEndpoint)

    if (txsRequest.status !== HttpStatus.OK) {
      throw new NotFoundException('No transactions found.')
    }

    const blocks = blockId
      ? { records: [await this.blockchainService.getBlockById(blockId)] }
      : await this.blockchainService.getBlocks({})

    const confirmedTxs: TransactionWithStatus[] = blocks.records.flatMap((block) =>
      block.transactions.map((tx) => ({ ...tx, isConfirmed: true }))
    )

    const unconfirmedTxs: TransactionWithStatus[] = blockId
      ? []
      : txsRequest.data.data.map((tx) => ({ ...tx, isConfirmed: false }))

    const transactions = confirmedTxs.concat(unconfirmedTxs)

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
      { page, limit },
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
    paginationDto: PaginationDto
  ): Promise<PaginationResult<Transaction[]>> {
    const transactions = await this.getAllTransactions()
    const transactionsOfWallet = transactions.filter(
      (transaction) =>
        transaction.receiverAddress === walletAddress || transaction.senderAddress === walletAddress
    )
    const paginatedTransactionsOfWallet = paginateArray(transactionsOfWallet, paginationDto)

    if (!transactionsOfWallet.length) {
      throw new BadRequestException('No transactions found for address.')
    }

    return createPaginationResult(
      paginatedTransactionsOfWallet,
      paginationDto,
      transactionsOfWallet.length
    )
  }
}
