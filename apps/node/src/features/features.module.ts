import { Module } from '@nestjs/common'
import { SocketModule } from './socket/socket.module'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [SocketModule, WalletModule]
})
export class FeaturesModule {}
