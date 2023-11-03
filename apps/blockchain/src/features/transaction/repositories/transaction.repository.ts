import { BaseRepository } from '@common/repositories'
import { Injectable } from '@nestjs/common'
import { Transaction } from '../schemas'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class TransactionRepository extends BaseRepository<Transaction> {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>
  ) {
    super(transactionModel)
  }
}
