import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Transaction } from '../schemas'

export class CreateTransactionDto extends Transaction {
  @IsNotEmpty()
  @IsString()
  public receiverAddress: string

  @IsNotEmpty()
  @IsNumber()
  public amount: number
}
