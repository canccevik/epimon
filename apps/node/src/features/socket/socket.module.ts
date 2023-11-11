import { Module } from '@nestjs/common'
import { SocketService } from './socket.service'
import { IoClientModule } from 'nestjs-io-client'
import { Config, ENV } from '@config/index'

@Module({
  imports: [
    IoClientModule.forRootAsync({
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
  ],
  providers: [SocketService]
})
export class SocketModule {}
