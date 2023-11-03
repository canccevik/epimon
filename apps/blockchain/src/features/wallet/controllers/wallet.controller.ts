import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WalletService } from '../services'
import { Message } from '@common/decorators'
import { Wallet } from '../interfaces'

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @Message('Wallet created successfully.')
  public createWallet(): Wallet {
    return this.walletService.createWallet()
  }
}
