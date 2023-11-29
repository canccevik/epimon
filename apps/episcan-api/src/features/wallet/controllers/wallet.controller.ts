import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiParam } from '@nestjs/swagger'
import { WalletService } from '../services'
import { Message, WalletAddressDto } from '@epimon/common'

@ApiTags('wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':walletAddress/balance')
  @ApiParam({ name: 'walletAddress' })
  @Message('Wallet balance fetched successfully.')
  public async getBalanceOfAddress(
    @Param() { walletAddress }: WalletAddressDto
  ): Promise<{ balance: number }> {
    return this.walletService.getBalanceOfAddress(walletAddress)
  }
}
