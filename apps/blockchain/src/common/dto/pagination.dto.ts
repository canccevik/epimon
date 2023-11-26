import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public page?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public limit?: number
}
