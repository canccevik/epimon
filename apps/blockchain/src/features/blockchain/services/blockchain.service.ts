import { Injectable } from '@nestjs/common'
import { BlockRepository } from '../repositories'
import { BlockDocument } from '../schemas'

@Injectable()
export class BlockchainService {
  constructor(private readonly blockRepository: BlockRepository) {}

  public async getBlocks(): Promise<BlockDocument[]> {
    return this.blockRepository.find({})
  }

  public async getLastBlock(): Promise<BlockDocument> {
    return this.blockRepository.findOne({}).sort({ _id: -1 }).limit(1)
  }
}
