import { SearchResult } from '@epimon/common'
import { BlockchainService } from '@features/blockchain/services'
import { TransactionService } from '@features/transaction/services'
import { WalletService } from '@features/wallet/services'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class SearchService {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService
  ) {}

  public async search(value: string): Promise<SearchResult> {
    const block = await this.blockchainService.getBlockById(value).catch(() => {})
    if (block) {
      return { isBlock: true, isTransaction: false, isAddress: false }
    }

    const transaction = await this.transactionService.getTransactionById(value).catch(() => {})
    if (transaction) {
      return { isBlock: false, isTransaction: true, isAddress: false }
    }

    const wallet = await this.walletService.getBalanceOfAddress(value)
    if (wallet.balance) {
      return { isBlock: false, isTransaction: false, isAddress: true }
    }
    throw new BadRequestException('No result found for search.')
  }
}
