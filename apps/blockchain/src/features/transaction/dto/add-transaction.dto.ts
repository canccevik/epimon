import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, IsMongoId } from 'class-validator'

export class AddTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  public _id: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  public senderAddress: string | null

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public receiverAddress: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public amount: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public timestamp: number

  @ApiProperty()
  @IsOptional()
  @IsString()
  public signature: string
}
