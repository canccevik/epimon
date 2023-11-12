import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { TransactionDocument } from '../schemas'
import { Message, RequestHeader } from '@common/decorators'
import { TransactionService } from '../services'
import { AddTransactionDto, CreateTransactionDto } from '../dto'

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiHeader({ name: 'x-private-key' })
  @Message('Transaction created successfully.')
  public async createTransaction(
    @RequestHeader('x-private-key') privateKey: string,
    @Body() createTransactionDto: CreateTransactionDto
  ): Promise<TransactionDocument> {
    await this.transactionService.signTransaction(privateKey, createTransactionDto)
    return this.transactionService.createTransaction(createTransactionDto)
  }

  @Get()
  @Message('Transaction pool fetched successfully.')
  public getTransactionPool(): Promise<TransactionDocument[]> {
    return this.transactionService.getTransactionPool()
  }

  @Post()
  @Message('Transaction added to the transaction pool successfully.')
  public async addTransaction(@Body() transaction: AddTransactionDto): Promise<void> {
    return this.transactionService.addTransactionsToPool([
      transaction as unknown as TransactionDocument
    ])
  }
}
