import { PaginationDto } from '@epimon/common'

export function paginateArray<T>(array: Array<T>, { page, limit }: PaginationDto): Array<T> {
  return array.slice((page - 1) * limit, (page - 1) * limit + limit)
}
