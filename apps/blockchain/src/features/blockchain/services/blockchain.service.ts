import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { BlockService } from './block.service'
import { TransactionService } from '@features/transaction/services'
import { Block, BlockDocument } from '../schemas'
import { Config, ENV } from '@config/index'
import { Payload, PaginationResult, PaginationDto, AXIOS_INSTANCE } from '@epimon/common'
import { TransactionDocument } from '@features/transaction/schemas'
import { BlockRepository } from '../repositories'
import { AddMinedBlockDto } from '../dto'
import { Axios } from 'axios'

@Injectable()
export class BlockchainService {
  constructor(
    @Inject(ENV) private readonly config: Config,
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios,
    private readonly blockService: BlockService,
    private readonly blockRepository: BlockRepository,
    private readonly transactionService: TransactionService
  ) {}

  public async getChain(query: PaginationDto): Promise<PaginationResult<Block[]>> {
    const blocks = await this.blockRepository.paginate(query)

    if (blocks.totalRecords === 0) {
      throw new NotFoundException('No block found.')
    }
    return blocks
  }

  public async isChainValid(): Promise<boolean> {
    const originalGenesisBlock = this.blockService.createGenesisBlock()
    const savedBlocks = await this.blockService.getBlocks()
    const savedGenesisBlock = savedBlocks[0].toObject()

    delete savedGenesisBlock._id

    if (JSON.stringify(originalGenesisBlock) !== JSON.stringify(savedGenesisBlock)) {
      return false
    }

    let isChainValid = true

    for (let i = 1; i < savedBlocks.length; i++) {
      const currentBlock = savedBlocks[i]
      const previousBlock = savedBlocks[i - 1]

      if (currentBlock.hash !== this.blockService.calculateHash(currentBlock)) {
        isChainValid = false
      }

      for (const transaction of currentBlock.transactions) {
        if (!this.transactionService.isTransactionValid(transaction)) {
          isChainValid = false
        }
      }

      if (currentBlock.previousBlockHash !== previousBlock.hash) {
        isChainValid = false
      }
    }
    return isChainValid
  }

  public async fetchOrCreateGenesisBlock(): Promise<Block> {
    const rootNodeUri = this.config.ROOT_NODE_URI
    const { data } = await this.axios.get<Payload<BlockDocument[]>>(rootNodeUri + '/chain')

    if (data.statusCode === 200 && data.data.length > 0) {
      return data.data.find(
        (block) => block.nonce === 0 && block.previousBlockHash === null && block.timestamp === 0
      )
    }
    return this.blockService.createGenesisBlock()
  }

  public async syncChainWithRoot(): Promise<void> {
    await this.blockService.addGenesisBlockToChain()

    const rootNodeUri = this.config.ROOT_NODE_URI
    const chainRequest = await this.axios.get<Payload<BlockDocument[]>>(rootNodeUri + '/chain')
    const transactionPoolRequest = await this.axios.get<Payload<TransactionDocument[]>>(
      rootNodeUri + '/transactions/pool'
    )

    if (chainRequest.status !== 200 || transactionPoolRequest.status !== 200) {
      throw new Error('Something went wrong while syncing the chain.')
    }

    const transactionPool = transactionPoolRequest.data.data
    await this.transactionService.cleanTransactionPool()
    await this.transactionService.addTransactionsToPool(transactionPool)

    const chain = chainRequest.data.data
    await this.blockRepository.deleteMany({})
    await this.blockRepository.insertMany(chain)
  }

  public async addMinedBlock(minedBlock: AddMinedBlockDto): Promise<void> {
    const isBlockExists = await this.blockRepository.findById(minedBlock._id)

    if (isBlockExists) return

    await this.blockRepository.insertMany([minedBlock])
    await this.transactionService.cleanTransactionPool()
  }
}
