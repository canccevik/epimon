import { Message, Paginate, PaginationDto, PaginationResult, Transaction } from '@epimon/common'
import { Controller, Get, Query } from '@nestjs/common'
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
    @Query() query: PaginationDto
  ): Promise<PaginationResult<Transaction[]>> {
    return this.transactionService.getTransactions(query)
  }
}
