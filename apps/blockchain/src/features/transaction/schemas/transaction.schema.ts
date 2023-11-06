import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TransactionDocument = HydratedDocument<Transaction>

@Schema({
  collection: 'transaction-pool',
  versionKey: false,
  timestamps: {
    createdAt: false,
    updatedAt: false
  }
})
export class Transaction {
  @Prop({
    type: String
  })
  public senderAddress: string

  @Prop({
    type: String,
    required: true
  })
  public receiverAddress: string

  @Prop({
    type: Number,
    required: true
  })
  public amount: number

  @Prop({
    type: String,
    required: true
  })
  public signature: string

  @Prop({
    type: Number,
    required: true
  })
  public timestamp: number
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
