import { Config, ENV } from '@config/index'
import { Inject, Injectable } from '@nestjs/common'
import { mnemonicToEntropy } from 'bip39'
import { ec as EC } from 'elliptic'

@Injectable()
export class WalletService {
  private readonly ec = new EC('secp256k1')

  constructor(@Inject(ENV) private readonly config: Config) {}

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
}
