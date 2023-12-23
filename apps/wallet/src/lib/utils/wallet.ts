import { ec as EC } from 'elliptic'
import { mnemonicToEntropy } from 'bip39'
import { Wallet } from '@epimon/common'

const ec = new EC('secp256k1')

export function createWalletFromSecretPhrase(secretPhrase: string): Wallet {
  const entropy = mnemonicToEntropy(secretPhrase)

  const keyPair = ec.genKeyPair({ entropy })
  const privateKey = keyPair.getPrivate('hex')
  const publicKey = keyPair.getPublic('hex')

  return {
    secretPhrase,
    privateKey,
    publicKey
  }
}
