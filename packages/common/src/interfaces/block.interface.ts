import { Transaction } from './transaction.interface'

export interface Block {
  _id?: string
  timestamp: number
  nonce: number
  reward: number
  hash: string
  previousBlockHash: string
  transactions: Transaction[]
}
