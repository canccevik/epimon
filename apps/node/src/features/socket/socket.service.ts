import { BlockchainService } from '@features/blockchain/blockchain.service'
import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Axios } from 'axios'
import { Config, ENV } from '@config/index'
import {
  InjectIoClientProvider,
  IoClient,
  OnConnect,
  OnDisconnect,
  EventListener
} from 'nestjs-io-client'
import {
  AXIOS_INSTANCE,
  Block,
  NEW_BLOCK_EVENT,
  NEW_TRANSACTION_EVENT,
  Transaction
} from '@epimon/common'

@Injectable()
export class SocketService {
  constructor(
    @Inject(ENV) private readonly config: Config,
    @InjectIoClientProvider() private readonly io: IoClient,
    @Inject(AXIOS_INSTANCE) private readonly axios: Axios,
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
    const { status } = await this.axios.post(addBlockEndpoint, block)

    if (status !== HttpStatus.CREATED) {
      console.error('❌ Something went wrong while receiving new block.')
      await this.blockchainService.syncChainWithRoot()
    }
    console.info('✅ New block received successfully.')
  }

  @EventListener(NEW_TRANSACTION_EVENT)
  public async onNewTransaction(transaction: Transaction): Promise<void> {
    const newTransactionEndpoint = this.config.LOCAL_API_URI + '/transactions/pool'
    const { status } = await this.axios.post(newTransactionEndpoint, transaction)

    if (status !== HttpStatus.CREATED) {
      console.error('❌ Something went wrong while receiving new transaction.')
      await this.blockchainService.syncChainWithRoot()
    }
    console.log('✅ New transaction received successfully.')
    await this.blockchainService.mineBlock()
  }
}
