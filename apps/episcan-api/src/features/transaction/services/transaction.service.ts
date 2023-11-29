import { paginateArray } from '@common/utils'
import { Config, ENV } from '@config/index'
import { BlockchainService } from '@features/blockchain/services'
import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Axios } from 'axios'
import {
  AXIOS_INSTANCE,
  PaginationDto,
  PaginationResult,
  Payload,
  Transaction,
  createPaginationResult
} from '@epimon/common'

@Injectable()
export class TransactionService {
  constructor(
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios,
    @Inject(ENV) private readonly config: Config,
    private readonly blockchainService: BlockchainService
  ) {}

  public async getAllTransactions(): Promise<Transaction[]> {
    const txsEndpoint = this.config.ROOT_NODE_URI + '/transactions/pool'
    const txsRequest = await this.axios.get<Payload<Transaction[]>>(txsEndpoint)

    if (txsRequest.status !== HttpStatus.OK) {
      throw new BadRequestException(txsRequest.data.message)
    }

    const blocks = await this.blockchainService.getBlocks({})

    return blocks.records
      .flatMap((block) => block.transactions)
      .concat(txsRequest.data.data)
      .sort((a, b) => b.timestamp - a.timestamp)
  }

  public async getTransactions({
    page,
    limit
  }: PaginationDto): Promise<PaginationResult<Transaction[]>> {
    const transactions = await this.getAllTransactions()
    const paginatedTransactions = paginateArray(transactions, { page, limit })

    return createPaginationResult<Transaction>(
      paginatedTransactions,
      page,
      limit,
      transactions.length
    )
  }

  public async getTransactionById(id: string): Promise<Transaction> {
    const transactions = await this.getAllTransactions()
    const transaction = transactions.find((transaction) => transaction._id === id)

    if (!transaction) {
      throw new BadRequestException('Transaction not found.')
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