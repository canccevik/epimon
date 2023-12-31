import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common'
import { Transaction, TransactionDocument } from '../schemas'
import crypto from 'crypto'
import { TransactionRepository } from '../repositories'
import { ec as EC } from 'elliptic'
import { isPublicKeyValid } from '@common/utils'
import { Config, ENV } from '@config/index'
import { WalletService } from '@features/wallet/services'
import { BlockchainService } from '@features/blockchain/services'
import { CreateTransactionDto } from '../dto'
import { P2PGateway } from '@features/p2p/gateways'
import { NEW_TRANSACTION_EVENT } from '@epimon/common'

@Injectable()
export class TransactionService {
  private readonly ec = new EC('secp256k1')

  constructor(
    private readonly p2pGateway: P2PGateway,
    @Inject(ENV) private readonly config: Config,
    private readonly transactionRepository: TransactionRepository,
    @Inject(forwardRef(() => BlockchainService))
    private readonly blockchainService: BlockchainService,
    @Inject(forwardRef(() => WalletService))
    private readonly walletService: WalletService
  ) {}

  public async getTransactionPool(): Promise<TransactionDocument[]> {
    return this.transactionRepository.find({})
  }

  public async cleanTransactionPool(): Promise<void> {
    await this.transactionRepository.deleteMany({})
  }

  private calculateHash(transaction: Transaction): string {
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

  public signTransaction(privateKey: string, transaction: CreateTransactionDto): void {
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

  public isTransactionValid(transaction: Transaction): boolean {
    if (transaction.senderAddress === null) {
      return true
    }

    if (!transaction.signature || transaction.signature.length === 0) {
      return false
    }

    const transactionHash = this.calculateHash(transaction)
    const signingKey = this.ec.keyFromPublic(transaction.senderAddress, 'hex')
    return signingKey.verify(transactionHash, transaction.signature)
  }

  public createGenesisTransaction(privateKey: string): Transaction {
    const publicAddress = this.ec.keyFromPrivate(privateKey).getPublic('hex')

    const genesisTransaction = new Transaction()
    genesisTransaction.senderAddress = null
    genesisTransaction.receiverAddress = publicAddress
    genesisTransaction.amount = this.config.OWNER_WALLET_INITIAL_BALANCE
    genesisTransaction.timestamp = 0

    return genesisTransaction
  }

  public async createRewardTransaction(minerAddress: string): Promise<TransactionDocument> {
    const rewardTransaction = new Transaction()

    rewardTransaction.amount = this.config.MINING_REWARD
    rewardTransaction.receiverAddress = minerAddress
    rewardTransaction.senderAddress = null
    rewardTransaction.timestamp = Date.now()

    return this.createTransaction(rewardTransaction)
  }

  public async createTransaction(transaction: Transaction): Promise<TransactionDocument> {
    if (transaction.senderAddress) {
      if (!this.isTransactionValid(transaction)) {
        throw new BadRequestException('Transaction is not valid.')
      }
      await this.validateBalanceForTransaction(transaction)
    }

    const isChainValid = await this.blockchainService.isChainValid()

    if (!isChainValid) {
      throw new BadRequestException('Blockchain is not valid.')
    }

    const createdTransaction = await this.transactionRepository.create(transaction)
    this.p2pGateway.server.emit(NEW_TRANSACTION_EVENT, createdTransaction)
    return createdTransaction
  }

  private async validateBalanceForTransaction(transaction: Transaction): Promise<void> {
    const walletBalance = await this.walletService.getBalanceOfWallet(transaction.senderAddress)

    if (walletBalance < transaction.amount) {
      throw new BadRequestException('Your balance is not enough for this transaction.')
    }

    const pendingTransactionsForSender = await this.transactionRepository.find({
      senderAddress: transaction.senderAddress
    })

    if (pendingTransactionsForSender.length <= 0) return

    const totalPendingAmount = pendingTransactionsForSender
      .map((transaction) => transaction.amount)
      .reduce((total, amount) => total + amount)
    const totalAmount = totalPendingAmount + transaction.amount

    if (totalAmount > walletBalance) {
      throw new BadRequestException(
        "Pending transactions for this wallet is higher than it's balance."
      )
    }
  }

  public async addTransactionsToPool(transactions: TransactionDocument[]): Promise<void> {
    const nonExistentTransactions: TransactionDocument[] = []

    for (const transaction of transactions) {
      if (transaction.senderAddress && !this.isTransactionValid(transaction)) {
        throw new BadRequestException('Transaction is not valid.')
      }

      const isTransactionExists = await this.transactionRepository.findById(
        transaction._id.toString()
      )

      if (!isTransactionExists) {
        nonExistentTransactions.push(transaction)
      }
    }
    await this.transactionRepository.insertMany(nonExistentTransactions)
  }
}
