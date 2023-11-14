import { Module } from '@nestjs/common'
import { BlockchainService } from './blockchain.service'
import { WalletModule } from '@features/wallet/wallet.module'

@Module({
  imports: [WalletModule],
  providers: [BlockchainService],
  exports: [BlockchainService]
})
export class BlockchainModule {}
