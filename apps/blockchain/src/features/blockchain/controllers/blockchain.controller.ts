import { Controller, Get, Post } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { BlockDocument } from '../schemas'
import { BlockRepository } from '../repositories'
import { Message, RequestHeader } from '@common/decorators'
import { BlockService, BlockchainService } from '../services'

@ApiTags('chain')
@Controller('chain')
export class BlockchainController {
  constructor(
    private readonly blockRepository: BlockRepository,
    private readonly blockService: BlockService,
    private readonly blockchainService: BlockchainService
  ) {}

  @Get()
  @Message('Chain fetched successfully.')
  public async getChain(): Promise<BlockDocument[]> {
    return this.blockRepository.find({})
  }

  @Get('status')
  @Message('Chain status fetched successfully.')
  public async getChainStatus(): Promise<{ status: boolean }> {
    const status = await this.blockchainService.isChainValid()
    return { status }
  }

  @Post('mine')
  @ApiHeader({ name: 'x-private-key' })
  @Message('A new block mined successfully.')
  public async mineBlock(
    @RequestHeader('x-private-key') privateKey: string
  ): Promise<BlockDocument> {
    return this.blockService.mineBlock(privateKey)
  }
}
