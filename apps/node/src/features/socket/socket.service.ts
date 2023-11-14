import { BlockchainService } from '@features/blockchain/blockchain.service'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import {
  InjectIoClientProvider,
  IoClient,
  OnConnect,
  OnDisconnect,
  EventListener
} from 'nestjs-io-client'
import { NEW_BLOCK_EVENT } from './constants'
import axios from 'axios'
import { Config, ENV } from '@config/index'
import { Block } from '@epimon/common'

@Injectable()
export class SocketService {
  constructor(
    @Inject(ENV) private readonly config: Config,
    @InjectIoClientProvider() private readonly io: IoClient,
    private readonly blockchainService: BlockchainService
  ) {}

  @OnConnect()
  public onConnect(): void {
    console.info('✅ Connected to the network.')
  }

  @OnDisconnect()
  public onDisconnect(): void {
    console.error('❌ Network disconnected.')
  }

  @EventListener(NEW_BLOCK_EVENT)
  public async onNewBlock(block: Block): Promise<void> {
    const addBlockEndpoint = this.config.LOCAL_API_URI + '/chain'
    const { status } = await axios.post(addBlockEndpoint, block)

    if (status !== HttpStatus.CREATED) {
      console.error('❌ Something went wrong while receiving new block.')
      return this.blockchainService.syncChainWithRoot()
    }
    console.info('✅ New block received successfully.')
  }
}
