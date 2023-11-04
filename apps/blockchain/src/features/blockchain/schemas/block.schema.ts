import { TransactionDocument } from '@features/transaction/schemas'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type BlockDocument = HydratedDocument<Block>

@Schema({
  versionKey: false,
  timestamps: {
    updatedAt: false
  }
})
export class Block {
  @Prop({
    type: Number,
    required: true
  })
  public nonce: number

  @Prop({
    type: String,
    required: true
  })
  public previousBlockHash: string

  @Prop({
    type: Number,
    required: true
  })
  public timestamp: number

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'transaction',
    required: true
  })
  public transactions: TransactionDocument[]

  @Prop({
    type: String,
    required: true
  })
  public hash: string
}

export const BlockSchema = SchemaFactory.createForClass(Block)
