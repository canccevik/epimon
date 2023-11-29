import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags, ApiParam } from '@nestjs/swagger'
import { WalletService } from '../services'
import {
  Message,
  Miner,
  Paginate,
  PaginationDto,
  PaginationResult,
  Transaction,
  WalletAddressDto
} from '@epimon/common'
import { TransactionService } from '@features/transaction/services'

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService
  ) {}

  @Get(':walletAddress/balance')
  @ApiParam({ name: 'walletAddress' })
  @Message('Wallet balance fetched successfully.')
  public async getBalanceOfAddress(
    @Param() { walletAddress }: WalletAddressDto
  ): Promise<{ balance: number }> {
    return this.walletService.getBalanceOfAddress(walletAddress)
  }

  @Get(':walletAddress/transactions')
  @ApiParam({ name: 'walletAddress' })
  @Message("Wallet's transactions fetched successfully.")
  @Paginate()
  public async getTransactionsOfWallet(
    @Param() { walletAddress }: WalletAddressDto,
    @Query() query: PaginationDto
  ): Promise<PaginationResult<Transaction[]>> {
    return this.transactionService.getTransactionsOfWallet(walletAddress, query)
  }

  @Get('miners')
  @Paginate()
  @Message('Miners fetched successfully.')
  public async getMiners(@Query() query: PaginationDto): Promise<PaginationResult<Miner[]>> {
    return this.walletService.getMiners(query)
  }
}
