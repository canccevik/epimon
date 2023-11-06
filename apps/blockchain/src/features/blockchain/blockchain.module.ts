import { Module } from '@nestjs/common'
import { BlockchainController } from './controllers'
import { BlockService, BlockchainService } from './services'
import { MongooseModule } from '@nestjs/mongoose'
import { Block, BlockSchema } from './schemas'
import { BlockRepository } from './repositories'
import { TransactionModule } from '@features/transaction/transaction.module'
import { P2PModule } from '@features/p2p/p2p.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
    TransactionModule,
    P2PModule
  ],
  controllers: [BlockchainController],
  providers: [BlockchainService, BlockService, BlockRepository],
  exports: [BlockchainService, BlockService]
})
export class BlockchainModule {}
