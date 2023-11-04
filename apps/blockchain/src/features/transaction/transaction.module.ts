import { Module, forwardRef } from '@nestjs/common'
import { TransactionController } from './controllers'
import { TransactionService } from './services'
import { MongooseModule } from '@nestjs/mongoose'
import { Transaction, TransactionSchema } from './schemas'
import { TransactionRepository } from './repositories'
import { WalletModule } from '@features/wallet/wallet.module'
import { BlockchainModule } from '@features/blockchain/blockchain.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    forwardRef(() => WalletModule),
    forwardRef(() => BlockchainModule)
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService]
})
export class TransactionModule {}
