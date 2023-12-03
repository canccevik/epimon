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
    const isBlock = await this.blockchainService.getBlockById(value).catch(() => {})
    const isTransaction = await this.transactionService.getTransactionById(value).catch(() => {})
    const isAddress = await this.walletService.getBalanceOfAddress(value)

    if (!isBlock && !isTransaction && !isAddress.balance) {
      throw new BadRequestException('No result found for search.')
    }
    return { isBlock: !!isBlock, isTransaction: !!isTransaction, isAddress: !!isAddress.balance }
  }
}
