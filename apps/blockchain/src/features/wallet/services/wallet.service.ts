import { Injectable } from '@nestjs/common'
import { ec as EC } from 'elliptic'
import { generateMnemonic, mnemonicToEntropy } from 'bip39'
import { BlockService } from '@features/blockchain/services'
import { Wallet } from '@epimon/common'

@Injectable()
export class WalletService {
  private readonly ec = new EC('secp256k1')

  constructor(private readonly blockService: BlockService) {}

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

  public async getBalanceOfWallet(walletAddress: string): Promise<number> {
    let balance = 0
    const blocks = await this.blockService.getBlocks()

    for (const block of blocks) {
      for (const transaction of block.transactions) {
        if (transaction.senderAddress === walletAddress) {
          balance -= transaction.amount
        } else if (transaction.receiverAddress === walletAddress) {
          balance += transaction.amount
        }
      }
    }
    return balance
  }
}
