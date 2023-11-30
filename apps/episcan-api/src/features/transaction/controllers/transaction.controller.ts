import {
  Message,
  Paginate,
  PaginationDto,
  PaginationResult,
  Transaction,
  TransactionWithStatus
} from '@epimon/common'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TransactionService } from '../services'

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  @Paginate()
  @Message('Transactions fetched successfully.')
  public async getTransactions(
    @Query() query: PaginationDto & { blockId?: string }
  ): Promise<PaginationResult<TransactionWithStatus[]>> {
    return this.transactionService.getTransactions(query)
  }

  @Get(':id')
  @Message('Transaction fetched successfully.')
  public async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.getTransactionById(id)
  }
}
