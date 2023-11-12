import { Module } from '@nestjs/common'
import { SocketService } from './socket.service'
import { IoClientModule } from 'nestjs-io-client'
import { Config, ENV } from '@config/index'
import { BlockchainModule } from '@features/blockchain/blockchain.module'

const SocketClientModule = IoClientModule.forRootAsync({
  useFactory: (config: Config) => {
    return {
      uri: config.ROOT_SOCKET_URI,
      options: {
        reconnection: true,
        timeout: 500
      }
    }
  },
  inject: [ENV]
})

@Module({
  imports: [SocketClientModule, BlockchainModule],
  providers: [SocketService]
})
export class SocketModule {}
