import { Module } from '@nestjs/common'
import { BlockchainController } from './controllers'
import { BlockchainService } from './services'

@Module({
  controllers: [BlockchainController],
  providers: [BlockchainService]
})
export class BlockchainModule {}
