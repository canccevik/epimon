import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { WalletService } from '../services'
import { Wallet } from '../interfaces'
import { Message, WalletAddressDto } from '@epimon/common'

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @Message('Wallet created successfully.')
  public createWallet(): Wallet {
    return this.walletService.createWallet()
  }

  @Get(':walletAddress/balance')
  @ApiParam({ name: 'walletAddress' })
  @Message('Wallet balance fetched successfully.')
  public async getBalanceOfWallet(
    @Param() { walletAddress }: WalletAddressDto
  ): Promise<{ balance: number }> {
    const balance = await this.walletService.getBalanceOfWallet(walletAddress)
    return { balance }
  }
}
