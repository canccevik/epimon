import { BadRequestException, Injectable } from '@nestjs/common'
import { Transaction, TransactionDocument } from '../schemas'
import crypto from 'crypto'
import { TransactionRepository } from '../repositories'
import { ec as EC } from 'elliptic'
import { isPublicKeyValid } from '@common/utils'

@Injectable()
export class TransactionService {
  private readonly ec = new EC('secp256k1')

  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async getTransactionPool(): Promise<TransactionDocument[]> {
    return this.transactionRepository.find({})
  }

  public async cleanTransactionPool(): Promise<void> {
    await this.transactionRepository.deleteMany({})
  }

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

  public signTransaction(privateKey: string, transaction: Transaction): void {
    const signingKey = this.ec.keyFromPrivate(privateKey)
    const publicAddress = signingKey.getPublic('hex')

    transaction.senderAddress = publicAddress
    transaction.timestamp = Date.now()

    if (!isPublicKeyValid(transaction.receiverAddress)) {
      throw new BadRequestException('Receiver address is not valid.')
    }

    if (publicAddress === transaction.receiverAddress) {
      throw new BadRequestException('You cannot make transactions on your own.')
    }

    const transactionHash = this.calculateHash(transaction)
    const signature = signingKey.sign(transactionHash, 'base64')
    transaction.signature = signature.toDER('hex')
  }
}
