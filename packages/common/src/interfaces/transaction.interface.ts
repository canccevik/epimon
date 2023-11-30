export interface Transaction {
  _id?: string
  senderAddress: string
  receiverAddress: string
  amount: number
  timestamp: number
  signature: string
}

export interface TransactionWithStatus extends Transaction {
  isConfirmed: boolean
}
