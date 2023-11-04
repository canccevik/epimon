import { Injectable } from '@nestjs/common'
import { Transaction } from '../schemas'
import crypto from 'crypto'

@Injectable()
export class TransactionService {
  public calculateHash(transaction: Transaction): string {
    return crypto
      .createHash('sha256')
      .update(
        transaction.receiverAddress +
          transaction.senderAddress +
          transaction.timestamp +
          transaction.amount
      )
      .digest('hex')
  }
}
