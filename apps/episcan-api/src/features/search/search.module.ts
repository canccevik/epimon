import { Module } from '@nestjs/common'
import { SearchController } from './controllers'
import { SearchService } from './services'
import { BlockchainModule } from '@features/blockchain/blockchain.module'
import { TransactionModule } from '@features/transaction/transaction.module'
import { WalletModule } from '@features/wallet/wallet.module'

@Module({
  imports: [BlockchainModule, TransactionModule, WalletModule],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
