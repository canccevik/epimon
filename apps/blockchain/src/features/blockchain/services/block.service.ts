import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common'
import { Block, BlockDocument } from '../schemas'
import crypto from 'crypto'
import { Config, ENV } from '@config/index'
import { mnemonicToEntropy } from 'bip39'
import { ec as EC } from 'elliptic'
import { TransactionService } from '@features/transaction/services'
import { BlockRepository } from '../repositories'
import { BlockchainService } from './blockchain.service'

@Injectable()
export class BlockService {
  private readonly ec = new EC('secp256k1')

  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly blockRepository: BlockRepository,
    @Inject(forwardRef(() => BlockchainService))
    private readonly blockchainService: BlockchainService,
    private readonly transactionService: TransactionService
  ) {}

  public async getBlocks(): Promise<BlockDocument[]> {
    return this.blockRepository.find({})
  }

  public async getLastBlock(): Promise<BlockDocument> {
    return this.blockRepository.findOne({}).sort({ _id: -1 }).limit(1)
  }

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

  public async mineBlock(privateKey: string): Promise<BlockDocument> {
    const isChainValid = await this.blockchainService.isChainValid()

    if (!isChainValid) {
      throw new BadRequestException('Blockchain is not valid.')
    }

    const minerAddress = this.ec.keyFromPrivate(privateKey).getPublic('hex')
    const difficulty = this.config.DIFFICULTY
    const lastBlock = await this.getLastBlock()

    await this.transactionService.createRewardTransaction(minerAddress)

    const transactionPool = await this.transactionService.getTransactionPool()

    const block = new Block()
    block.hash = null
    block.nonce = 0
    block.timestamp = Date.now()
    block.previousBlockHash = lastBlock.hash
    block.transactions = transactionPool

    while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      block.nonce++
      block.hash = this.calculateHash(block)
    }
    await this.transactionService.cleanTransactionPool()

    return this.blockRepository.create(block)
  }
}
