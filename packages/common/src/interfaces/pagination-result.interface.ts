import { Pagination } from './index'

export interface PaginationResult<T> extends Pagination {
  records: T
}
