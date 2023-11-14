export interface Transaction {
  _id?: string
  senderAddress: string
  receiverAddress: string
  amount: number
  timestamp: number
  signature: string
}
