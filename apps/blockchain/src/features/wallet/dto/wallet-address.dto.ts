import { IsNotEmpty, IsString } from 'class-validator'

export class WalletAddressDto {
  @IsNotEmpty()
  @IsString()
  public walletAddress: string
}
