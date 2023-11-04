import { Module } from '@nestjs/common'
import { WalletService } from './services'
import { WalletController } from './controllers'
import { BlockchainModule } from '@features/blockchain/blockchain.module'

@Module({
  imports: [BlockchainModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule {}
