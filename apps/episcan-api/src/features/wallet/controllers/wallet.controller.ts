import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {}
