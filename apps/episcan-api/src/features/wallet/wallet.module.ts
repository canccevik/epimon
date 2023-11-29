import { Module } from '@nestjs/common'
import { WalletController } from './controllers'
import { WalletService } from './services'

@Module({
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
