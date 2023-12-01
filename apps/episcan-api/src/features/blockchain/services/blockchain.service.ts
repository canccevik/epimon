import { Config, ENV } from '@config/index'
import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Axios } from 'axios'
import { URLSearchParams } from 'url'
import { AXIOS_INSTANCE, Block, PaginationDto, PaginationResult, Payload } from '@epimon/common'

@Injectable()
export class BlockchainService {
  constructor(
    @Inject(ENV) private readonly config: Config,
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios
  ) {}

  public async getBlocks({ page, limit }: PaginationDto): Promise<PaginationResult<Block[]>> {
    const searchParams = new URLSearchParams()

    page && searchParams.set('page', page.toString())
    limit && searchParams.set('limit', limit.toString())

    const chainRequest = await this.axios.get<Payload<Block[]>>(
      this.config.ROOT_NODE_URI + '/chain?' + searchParams.toString()
    )
    if (chainRequest.status !== HttpStatus.OK) {
      throw new NotFoundException(chainRequest.data.message)
    }

    return {
      records: chainRequest.data.data,
      ...chainRequest.data.meta
    }
  }

  public async getBlockById(id: string): Promise<Block> {
    const blocks = await this.getBlocks({})
    const block = blocks.records.find((block) => block._id === id)

    if (!block) {
      throw new NotFoundException('Block not found.')
    }
    return block
  }
}
