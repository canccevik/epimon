import { Module } from '@nestjs/common'
import { WalletService } from './services'
import { WalletController } from './controllers'

@Module({
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
