import { Controller, Get, Query } from '@nestjs/common'
import { BlockchainService } from '../services'
import { Block, Message, Paginate, PaginationDto, PaginationResult } from '@epimon/common'

@Controller('chain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get()
  @Paginate()
  @Message('Blocks fetched successfully.')
  public async getBlocks(@Query() query: PaginationDto): Promise<PaginationResult<Block[]>> {
    return this.blockchainService.getBlocks(query)
  }
}
