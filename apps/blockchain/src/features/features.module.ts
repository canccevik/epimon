import { Module } from '@nestjs/common'
import { WalletModule } from './wallet/wallet.module'
import { BlockchainModule } from './blockchain/blockchain.module'
import { TransactionModule } from './transaction/transaction.module'

@Module({
  imports: [WalletModule, BlockchainModule, TransactionModule]
})
export class FeaturesModule {}
