import { Config, ENV } from '@config/index'
import { AXIOS_INSTANCE } from '@epimon/common'
import { WalletService } from '@features/wallet/wallet.service'
import { Inject, Injectable, HttpStatus } from '@nestjs/common'
import { Axios } from 'axios'

@Injectable()
export class BlockchainService {
  constructor(
    @Inject(ENV) private readonly config: Config,
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios,
    private readonly walletService: WalletService
  ) {}

  public async syncChainWithRoot(): Promise<void> {
    const { status } = await this.axios.post(this.config.LOCAL_API_URI + '/chain/sync')

    if (status !== HttpStatus.CREATED) {
      throw new Error('❌ Something went wrong while syncing the chain.')
    }
    console.info('✅ Chain synced with root chain successfully.')
  }

  public async mineBlock(): Promise<void> {
    const minerWallet = await this.walletService.getAddressesFromSecretPhrase(
      this.config.MINING_WALLET_SECRET_PHRASE
    )

    const mineEndpoint = this.config.LOCAL_API_URI + '/chain/mine'
    const mineRequest = await this.axios.post(
      mineEndpoint,
      {},
      { headers: { 'x-private-key': minerWallet.privateAddress } }
    )

    if (mineRequest.status !== HttpStatus.CREATED) return

    console.info('✅ New block mined successfully.')
    const balance = await this.walletService.getBalanceOfAddress(minerWallet.publicAddress)
    console.info(`🟢 Your current balance is: ${balance}`)
  }
}
