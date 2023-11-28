import { Module } from '@nestjs/common'
import { BlockchainModule } from './blockchain/blockchain.module'
import { TransactionModule } from './transaction/transaction.module'

@Module({
  imports: [BlockchainModule, TransactionModule]
})
export class FeaturesModule {}
