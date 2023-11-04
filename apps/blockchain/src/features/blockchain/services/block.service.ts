import { Inject, Injectable } from '@nestjs/common'
import { Block } from '../schemas'
import crypto from 'crypto'
import { Config, ENV } from '@config/index'
import { mnemonicToEntropy } from 'bip39'
import { ec as EC } from 'elliptic'
import { TransactionService } from '@features/transaction/services'

@Injectable()
export class BlockService {
  private readonly ec = new EC('secp256k1')

  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly transactionService: TransactionService
  ) {}

  public calculateHash(block: Block): string {
    return crypto
      .createHash('sha256')
      .update(
        block.timestamp +
          block.previousBlockHash +
          block.nonce +
          JSON.stringify(block.transactions).toString()
      )
      .digest('hex')
  }

  public createGenesisBlock(): Block {
    const ownerSecretPhrase = this.config.OWNER_WALLET_SECRET_PHRASE
    const entropy = mnemonicToEntropy(ownerSecretPhrase)
    const privateKey = this.ec.genKeyPair({ entropy }).getPrivate('hex')

    const genesisTransaction = this.transactionService.createGenesisTransaction(privateKey)

    const genesisBlock = new Block()
    genesisBlock.nonce = 0
    genesisBlock.previousBlockHash = null
    genesisBlock.timestamp = Date.now()
    genesisBlock.transactions = [genesisTransaction]
    genesisBlock.hash = this.calculateHash(genesisBlock)

    return genesisBlock
  }
}
