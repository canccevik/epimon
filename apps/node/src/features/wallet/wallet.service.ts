import { Config, ENV } from '@config/index'
import { AXIOS_INSTANCE, Payload } from '@epimon/common'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Axios } from 'axios'
import { mnemonicToEntropy } from 'bip39'
import { ec as EC } from 'elliptic'

@Injectable()
export class WalletService {
  private readonly ec = new EC('secp256k1')

  constructor(
    @Inject(ENV) private readonly config: Config,
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios
  ) {}

  public getAddressesFromSecretPhrase(secretPhrase: string): {
    privateAddress: string
    publicAddress: string
  } {
    const entropy = mnemonicToEntropy(secretPhrase)
    const keyPair = this.ec.genKeyPair({ entropy })

    const privateAddress = keyPair.getPrivate('hex')
    const publicAddress = keyPair.getPublic('hex')

    return { privateAddress, publicAddress }
  }

  public async getBalanceOfAddress(publicAddress: string): Promise<void | number> {
    const balanceRequest = await this.axios.get<Payload<{ balance: number }>>(
      this.config.LOCAL_API_URI + `/wallets/${publicAddress}/balance`
    )

    if (balanceRequest.status !== HttpStatus.OK) {
      return console.error('❌ Something went wrong while fetching balance of wallet.')
    }
    return balanceRequest.data.data.balance
  }
}
