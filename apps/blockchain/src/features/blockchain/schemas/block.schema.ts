import { Transaction } from '@features/transaction/schemas'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'
import { Block as IBlock } from '@epimon/common'

export type BlockDocument = HydratedDocument<Block>

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: false,
    updatedAt: false
  }
})
export class Block implements IBlock {
  @Prop({
    type: Number,
    required: true
  })
  public nonce: number

  @Prop({
    type: String
  })
  public previousBlockHash: string

  @Prop({
    type: Number,
    required: true
  })
  public timestamp: number

  @Prop({
    type: Number,
    required: true
  })
  public reward: number

  @Prop({
    type: String
  })
  public miner: string

  @Prop({
    type: Number,
    required: true
  })
  public difficulty: number

  @Prop({
    type: SchemaTypes.Array,
    required: true
  })
  public transactions: Transaction[]

  @Prop({
    type: String,
    required: true
  })
  public hash: string
}

export const BlockSchema = SchemaFactory.createForClass(Block)
