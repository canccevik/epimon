import { Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiTags, ApiParam } from '@nestjs/swagger'
import { TransactionService } from '@features/transaction/services'
import { WalletService } from '../services'
import {
  Message,
  Miner,
  Paginate,
  PaginationDto,
  PaginationResult,
  Transaction,
  Wallet,
  WalletAddressDto
} from '@epimon/common'

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService
  ) {}

  @Post()
  @Message('Wallet created successfully.')
  public async createWallet(): Promise<Wallet> {
    return this.walletService.createWallet()
  }

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
