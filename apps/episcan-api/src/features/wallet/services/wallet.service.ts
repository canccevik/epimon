import { Config, ENV } from '@config/index'
import { AXIOS_INSTANCE, Payload } from '@epimon/common'
import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Axios } from 'axios'

@Injectable()
export class WalletService {
  constructor(
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios,
    @Inject(ENV) private readonly config: Config
  ) {}

  public async getBalanceOfAddress(address: string): Promise<{ balance: number }> {
    const balanceEndpoint = this.config.ROOT_NODE_URI + `/wallets/${address}/balance`
    const balanceRequest = await this.axios.get<Payload<{ balance: number }>>(balanceEndpoint)

    if (balanceRequest.status !== HttpStatus.OK) {
      throw new BadRequestException(balanceRequest.data.message)
    }
    return balanceRequest.data.data
  }
}
