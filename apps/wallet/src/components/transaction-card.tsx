import { cn } from '@/lib/utils'
import { Card } from './ui/card'
import { TransactionWithStatus } from '@epimon/common'

interface Props {
  transaction: TransactionWithStatus
  publicAddress: string
}

export default function TransactionCard({ transaction, publicAddress }: Props) {
  const date = new Date(transaction.timestamp)
  const status = transaction.senderAddress === publicAddress ? 'Sent' : 'Received'

  return (
    <Card className="w-full flex justify-between px-5 py-3 rounded-md border relative">
      <span
        className={cn(
          'w-[3px] h-full absolute left-0 top-0 rounded-full',
          status === 'Received' ? `bg-green-500` : `bg-red-500`
        )}
      ></span>

      <div className="flex flex-col gap-y-2">
        <h1 className="text-sm font-normal">{status}</h1>

        <h4>
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).format(date)}
        </h4>
      </div>

      <div className="flex flex-col gap-y-2 text-right">
        <h1
          className={cn(
            'text-base font-medium',
            status === 'Received' ? `text-green-500` : `text-red-500`
          )}
        >
          {status === 'Received' ? '+' : '-'}
          {transaction.amount} EPM
        </h1>

        <h4>{transaction.isConfirmed ? 'Confirmed' : 'Not confirmed'}</h4>
      </div>
    </Card>
  )
}
