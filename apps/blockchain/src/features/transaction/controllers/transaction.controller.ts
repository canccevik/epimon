import { Body, Controller, Post } from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { TransactionDocument } from '../schemas'
import { Message, RequestHeader } from '@common/decorators'
import { TransactionService } from '../services'
import { CreateTransactionDto } from '../dto'

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
}
