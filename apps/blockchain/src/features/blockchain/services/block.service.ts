import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common'
import { Block, BlockDocument } from '../schemas'
import crypto from 'crypto'
import { Config, ENV } from '@config/index'
import { mnemonicToEntropy } from 'bip39'
import { ec as EC } from 'elliptic'
import { TransactionService } from '@features/transaction/services'
import { BlockRepository } from '../repositories'
import { BlockchainService } from './blockchain.service'
import { P2PGateway } from '@features/p2p/gateways'
import { NEW_BLOCK } from '@features/p2p/constants'

@Injectable()
export class BlockService {
  private readonly ec = new EC('secp256k1')

  constructor(
    private readonly p2pGateway: P2PGateway,
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
    genesisBlock.timestamp = 0
    genesisBlock.transactions = [genesisTransaction]
    genesisBlock.hash = this.calculateHash(genesisBlock)

    return genesisBlock
  }

  public async addGenesisBlockToChain(): Promise<void> {
    const isGenesisBlockExists = await this.blockRepository.findOne({
      previousBlockHash: null,
      timestamp: 0,
      nonce: 0
    })

    if (isGenesisBlockExists) return

    const genesisBlock = await this.blockchainService.fetchOrCreateGenesisBlock()
    await this.blockRepository.create(genesisBlock)
  }

  public async mineBlock(privateKey: string): Promise<BlockDocument> {
    const isChainValid = await this.blockchainService.isChainValid()
    if (!isChainValid) {
      throw new BadRequestException('Blockchain is not valid.')
    }

    const txPool = await this.transactionService.getTransactionPool()
    if (!txPool.length) {
      throw new BadRequestException('There is no transaction to mine.')
    }

    const minerAddress = this.ec.keyFromPrivate(privateKey).getPublic('hex')
    const difficulty = this.config.DIFFICULTY
    const lastBlock = await this.getLastBlock()

    await this.transactionService.createRewardTransaction(minerAddress)

    const transactionPool = await this.transactionService.getTransactionPool()

    const block = new Block()
    block.hash = ''
    block.nonce = 0
    block.timestamp = Date.now()
    block.previousBlockHash = lastBlock.hash
    block.transactions = transactionPool

    while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      block.nonce++
      block.hash = this.calculateHash(block)
    }

    const createdBlock = await this.blockRepository.create(block)
    await this.transactionService.cleanTransactionPool()

    this.p2pGateway.server.emit(NEW_BLOCK, createdBlock)
    return createdBlock
  }
}
