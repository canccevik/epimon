import { Module } from '@nestjs/common'
import { TransactionController } from './controllers'
import { TransactionService } from './services'
import { BlockchainModule } from '@features/blockchain/blockchain.module'

@Module({
  imports: [BlockchainModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
