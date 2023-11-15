import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Transaction } from '../schemas'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTransactionDto extends Transaction {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public receiverAddress: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public amount: number
}
