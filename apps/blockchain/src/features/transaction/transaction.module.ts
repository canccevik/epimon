import { Module } from '@nestjs/common'
import { TransactionController } from './controllers'
import { TransactionService } from './services'

@Module({
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
