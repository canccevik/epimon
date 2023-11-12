import { Config, ENV } from '@config/index'
import { Inject, Injectable, HttpStatus } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class BlockchainService {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public async syncChainWithRoot(): Promise<void> {
    const { status } = await axios.post(this.config.LOCAL_API_URI + '/chain/sync')

    if (status !== HttpStatus.CREATED) {
      throw new Error('❌ Something went wrong while syncing the chain.')
    }
    console.info('✅ Chain synced with root chain successfully.')
  }
}
