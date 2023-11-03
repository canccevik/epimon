import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('chain')
@Controller('chain')
export class BlockchainController {}
