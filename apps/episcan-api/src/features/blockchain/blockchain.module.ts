import { Module } from '@nestjs/common'
import { BlockchainController } from './controllers'
import { BlockchainService } from './services'

@Module({
  controllers: [BlockchainController],
  providers: [BlockchainService],
  exports: [BlockchainService]
})
export class BlockchainModule {}
