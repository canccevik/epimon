import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BlockDocument } from '../schemas'
import { BlockRepository } from '../repositories'
import { Message } from '@common/decorators'

@ApiTags('chain')
@Controller('chain')
export class BlockchainController {
  constructor(private readonly blockRepository: BlockRepository) {}

  @Get()
  @Message('Chain fetched successfully.')
  public async getChain(): Promise<BlockDocument[]> {
    return this.blockRepository.find({})
  }
}
