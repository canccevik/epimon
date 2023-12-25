import {
  Message,
  Paginate,
  PaginationResult,
  RequestHeader,
  Transaction,
  TransactionWithStatus
} from '@epimon/common'
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TransactionService } from '../services'
import { CreateTransactionDto, PaginationWithBlockIdDto } from '../dto'

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @Message('Transaction created successfully.')
  public async createTransaction(
    @Body() createTxDto: CreateTransactionDto,
    @RequestHeader('x-private-key') privateKey: string
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(createTxDto, privateKey)
  }

  @Get()
  @Paginate()
  @Message('Transactions fetched successfully.')
  public async getTransactions(
    @Query() query: PaginationWithBlockIdDto
  ): Promise<PaginationResult<TransactionWithStatus[]>> {
    return this.transactionService.getTransactions(query)
  }

  @Get(':id')
  @Message('Transaction fetched successfully.')
  public async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.getTransactionById(id)
  }
}
