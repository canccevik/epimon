import { Controller, Get, Param, Query } from '@nestjs/common'
import { BlockchainService } from '../services'
import { ApiTags } from '@nestjs/swagger'
import { Block, Message, Paginate, PaginationDto, PaginationResult } from '@epimon/common'

@ApiTags('chain')
@Controller('chain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get()
  @Paginate()
  @Message('Blocks fetched successfully.')
  public async getBlocks(@Query() query: PaginationDto): Promise<PaginationResult<Block[]>> {
    return this.blockchainService.getBlocks(query)
  }

  @Get(':id')
  @Message('Block fetched successfully.')
  public async getBlockById(@Param('id') id: string): Promise<Block> {
    return this.blockchainService.getBlockById(id)
  }
}
