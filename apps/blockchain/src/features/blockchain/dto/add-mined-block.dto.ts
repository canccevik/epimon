import { TransactionDocument } from '@features/transaction/schemas'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddMinedBlockDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  public id: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public nonce: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public previousBlockHash: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public timestamp: number

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  public transactions: TransactionDocument[]

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public hash: string
}
