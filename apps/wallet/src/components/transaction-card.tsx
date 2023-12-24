import { cn } from '@/lib/utils'
import { Card } from './ui/card'

interface Props {
  status: 'Sent' | 'Recevied'
  timestamp: number
  amount: number
}

export default function TransactionCard({ status, timestamp, amount }: Props) {
  const date = new Date(timestamp)

  const getStatusColor = (type: 'bg' | 'text') =>
    status === 'Recevied' ? `${type}-green-500` : `${type}-red-500`

  return (
    <Card className="w-full flex justify-between px-5 py-3 rounded-md border relative">
      <span
        className={cn('w-[3px] h-full absolute left-0 top-0 rounded-full', getStatusColor('bg'))}
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

      <div className="flex flex-col gap-y-2">
        <h1 className={cn('text-base font-medium', getStatusColor('text'))}>
          {status === 'Recevied' ? '+' : '-'}
          {amount} EPM
        </h1>

        <h4>
          {new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }).format(date)}
        </h4>
      </div>
    </Card>
  )
}