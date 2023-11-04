import { Injectable } from '@nestjs/common'
import { BlockService } from './block.service'
import { TransactionService } from '@features/transaction/services'

@Injectable()
export class BlockchainService {
  constructor(
    private readonly blockService: BlockService,
    private readonly transactionService: TransactionService
  ) {}

  public async isChainValid(): Promise<boolean> {
    const originalGenesisBlock = this.blockService.createGenesisBlock()
    const savedBlocks = await this.blockService.getBlocks()
    const savedGenesisBlock = savedBlocks[0]

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
}
