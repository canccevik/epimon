import { Config, ENV } from '@config/index'
import {
  AXIOS_INSTANCE,
  PaginationDto,
  PaginationResult,
  Payload,
  Transaction,
  createPaginationResult
} from '@epimon/common'
import { BlockchainService } from '@features/blockchain/services'
import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Axios } from 'axios'

@Injectable()
export class TransactionService {
  constructor(
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios,
    @Inject(ENV) private readonly config: Config,
    private readonly blockchainService: BlockchainService
  ) {}

  private async getAllTransactions(): Promise<Transaction[]> {
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
    const paginatedTransactions = transactions.slice((page - 1) * limit, (page - 1) * limit + limit)

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
}
