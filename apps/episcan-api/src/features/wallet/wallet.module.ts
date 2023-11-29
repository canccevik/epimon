import { Module } from '@nestjs/common'
import { WalletController } from './controllers'
import { WalletService } from './services'
import { TransactionModule } from '@features/transaction/transaction.module'

@Module({
  imports: [TransactionModule],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
