export interface Payload<T = undefined> {
  message: string
  statusCode: number
  data?: T
}
