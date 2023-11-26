import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { BlockDocument } from '../schemas'
import { BlockRepository } from '../repositories'
import { RequestHeader } from '@common/decorators'
import { BlockService, BlockchainService } from '../services'
import { AddMinedBlockDto } from '../dto'
import { Message } from '@epimon/common'
import { PaginationDto } from '@common/dto'
import { PaginationResult } from '@common/interfaces'

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
  public async getChain(@Query() query: PaginationDto): Promise<PaginationResult> {
    return this.blockchainService.getChain(query)
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

  @Post('sync')
  @Message('Chain synced successfully.')
  public async syncChain(): Promise<void> {
    await this.blockchainService.syncChainWithRoot()
  }

  @Post()
  @Message('Block added to chain successfully.')
  public async addMinedBlock(@Body() minedBlock: AddMinedBlockDto): Promise<void> {
    return this.blockchainService.addMinedBlock(minedBlock)
  }
}
