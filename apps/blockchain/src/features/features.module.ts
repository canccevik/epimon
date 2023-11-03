import { Module } from '@nestjs/common'
import { WalletModule } from './wallet/wallet.module'

@Module({
  imports: [WalletModule]
})
export class FeaturesModule {}
