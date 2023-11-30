import { PaginationDto } from '@epimon/common'
import { IsOptional, IsMongoId } from 'class-validator'

export class PaginationWithBlockIdDto extends PaginationDto {
  @IsOptional()
  @IsMongoId()
  public blockId: string
}
