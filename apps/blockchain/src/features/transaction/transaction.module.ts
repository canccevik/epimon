import { Module } from '@nestjs/common'
import { TransactionController } from './controllers'
import { TransactionService } from './services'
import { MongooseModule } from '@nestjs/mongoose'
import { Transaction, TransactionSchema } from './schemas'
import { TransactionRepository } from './repositories'

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository]
})
export class TransactionModule {}
