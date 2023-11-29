import { Module } from '@nestjs/common'
import { BlockchainModule } from './blockchain/blockchain.module'
import { TransactionModule } from './transaction/transaction.module'
import { WalletModule } from './wallet/wallet.module'
import { SearchModule } from './search/search.module'

@Module({
  imports: [BlockchainModule, TransactionModule, WalletModule, SearchModule]
})
export class FeaturesModule {}
