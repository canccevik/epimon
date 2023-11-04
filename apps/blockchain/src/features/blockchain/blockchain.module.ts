import { Module } from '@nestjs/common'
import { BlockchainController } from './controllers'
import { BlockService, BlockchainService } from './services'
import { MongooseModule } from '@nestjs/mongoose'
import { Block, BlockSchema } from './schemas'
import { BlockRepository } from './repositories'
import { TransactionModule } from '@features/transaction/transaction.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
    TransactionModule
  ],
  controllers: [BlockchainController],
  providers: [BlockchainService, BlockService, BlockRepository],
  exports: [BlockchainService, BlockService]
})
export class BlockchainModule {}
