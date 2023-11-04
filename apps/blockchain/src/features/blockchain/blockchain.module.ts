import { Module } from '@nestjs/common'
import { BlockchainController } from './controllers'
import { BlockchainService } from './services'
import { MongooseModule } from '@nestjs/mongoose'
import { Block, BlockSchema } from './schemas'
import { BlockRepository } from './repositories'

@Module({
  imports: [MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }])],
  controllers: [BlockchainController],
  providers: [BlockchainService, BlockRepository]
})
export class BlockchainModule {}
