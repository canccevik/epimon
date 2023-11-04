import { BaseRepository } from '@common/repositories'
import { Injectable } from '@nestjs/common'
import { Block } from '../schemas'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class BlockRepository extends BaseRepository<Block> {
  constructor(@InjectModel(Block.name) private readonly blockModel: Model<Block>) {
    super(blockModel)
  }
}
