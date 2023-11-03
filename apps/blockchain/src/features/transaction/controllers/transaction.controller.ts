import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {}
