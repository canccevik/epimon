import { Module } from '@nestjs/common'
import { WalletModule } from './wallet/wallet.module'
import { BlockchainModule } from './blockchain/blockchain.module'

@Module({
  imports: [WalletModule, BlockchainModule]
})
export class FeaturesModule {}
