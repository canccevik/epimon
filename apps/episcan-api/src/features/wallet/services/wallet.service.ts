import { TransactionService } from '@features/transaction/services'
import { paginateArray } from '@common/utils'
import { Config, ENV } from '@config/index'
import {
  AXIOS_INSTANCE,
  Miner,
  PaginationDto,
  PaginationResult,
  Payload,
  createPaginationResult
} from '@epimon/common'
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Axios } from 'axios'

@Injectable()
export class WalletService {
  constructor(
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios,
    @Inject(ENV) private readonly config: Config,
    private readonly transactionService: TransactionService
  ) {}

  public async getBalanceOfAddress(address: string): Promise<{ balance: number }> {
    const balanceEndpoint = this.config.ROOT_NODE_URI + `/wallets/${address}/balance`
    const balanceRequest = await this.axios.get<Payload<{ balance: number }>>(balanceEndpoint)

    if (balanceRequest.status !== HttpStatus.OK) {
      throw new BadRequestException(balanceRequest.data.message)
    }
    return balanceRequest.data.data
  }

  public async getMiners(paginationDto: PaginationDto): Promise<PaginationResult<Miner[]>> {
    const transactions = await this.transactionService.getAllTransactions()
    const miningTransactions = transactions.filter((tx) => !tx.senderAddress && tx.timestamp !== 0)
    const minerAddresses = [...new Set(miningTransactions.map((tx) => tx.receiverAddress))]

    if (!minerAddresses.length) {
      throw new NotFoundException('No miner found.')
    }

    const unsortedMiners: Miner[] = minerAddresses.map((address) => {
      const totalReward = miningTransactions
        .filter((tx) => tx.receiverAddress === address)
        .flatMap((tx) => tx.amount)
        .reduce((prev, curr) => prev + curr, 0)

      return { address, totalReward, rank: 0 }
    })

    const sortedMiners: Miner[] = unsortedMiners
      .sort((a, b) => b.totalReward - a.totalReward)
      .map((miner, i) => {
        miner.rank = i + 1
        return miner
      })

    const paginatedMiners = paginateArray(sortedMiners, paginationDto)

    return createPaginationResult(paginatedMiners, paginationDto, sortedMiners.length)
  }
}
