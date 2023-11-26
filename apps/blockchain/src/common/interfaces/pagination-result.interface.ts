export interface PaginationResult<T = unknown> {
  records: T[]
  lastPage: number
  previousPage: number | null
  nextPage: number | null
}
