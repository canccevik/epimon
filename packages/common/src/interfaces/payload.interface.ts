import { Pagination } from './pagination.interface'

export interface Payload<T> {
  message: string
  statusCode: number
  data?: T
  meta?: Pagination
}
