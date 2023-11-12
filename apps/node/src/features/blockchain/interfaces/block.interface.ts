import { Transaction } from './transaction.interface'

export interface Block {
  _id: string
  timestamp: number
  nonce: number
  hash: string
  previousHash: string
  transactions: Transaction[]
}
