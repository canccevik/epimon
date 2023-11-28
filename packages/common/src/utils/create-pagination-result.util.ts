import { PaginationResult } from '../interfaces'

export function createPaginationResult<T>(
  records: T[],
  page: number,
  limit: number,
  totalRecords: number
): PaginationResult<T[]> {
  const lastPage = Math.ceil(totalRecords / limit)

  return {
    records: records,
    currentPage: page,
    nextPage: page < lastPage ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
    pageSize: limit,
    totalRecords,
    lastPage
  }
}
