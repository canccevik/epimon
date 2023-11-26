import { Module } from '@nestjs/common'
import { BlockchainModule } from './blockchain/blockchain.module'

@Module({
  imports: [BlockchainModule]
})
export class FeaturesModule {}
