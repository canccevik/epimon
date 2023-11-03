import { Injectable } from '@nestjs/common'
import { ec as EC } from 'elliptic'
import { generateMnemonic, mnemonicToEntropy } from 'bip39'
import { Wallet } from '../interfaces'

@Injectable()
export class WalletService {
  private readonly ec = new EC('secp256k1')

  public createWallet(): Wallet {
    const secretPhrase = generateMnemonic()
    const entropy = mnemonicToEntropy(secretPhrase)

    const keyPair = this.ec.genKeyPair({ entropy })
    const privateKey = keyPair.getPrivate('hex')
    const publicKey = keyPair.getPublic('hex')

    return {
      secretPhrase,
      privateKey,
      publicKey
    }
  }
}
