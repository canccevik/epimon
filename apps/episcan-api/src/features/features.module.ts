import { Module } from '@nestjs/common'
import { BlockchainModule } from './blockchain/blockchain.module'
import { TransactionModule } from './transaction/transaction.module'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [BlockchainModule, TransactionModule, WalletModule]
})
export class FeaturesModule {}
