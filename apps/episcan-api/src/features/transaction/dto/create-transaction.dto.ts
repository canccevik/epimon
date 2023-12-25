import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public receiverAddress: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public amount: number
}
