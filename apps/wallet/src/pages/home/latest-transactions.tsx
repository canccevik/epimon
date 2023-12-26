import TransactionCard from '@/components/transaction-card'
import { Card } from '@/components/ui/card'
import { WalletContext } from '@/context/wallet-context'
import { fetcher } from '@/lib/utils/fetcher'
import { Payload, TransactionWithStatus } from '@epimon/common'
import { Loader } from 'lucide-react'
import { useContext } from 'react'
import useSWR from 'swr'

export default function LatestTransactions() {
  const { wallet } = useContext(WalletContext)

  const transactionsRequest = useSWR<Payload<TransactionWithStatus[]>, Payload<null>>(
    `/wallets/${wallet?.publicKey}/transactions?page=1&limit=5`,
    fetcher()
  )

  return (
    <div className="w-full">
      <h1 className="text-base mb-5">Latest Transactions</h1>

      <div className="flex flex-col items-center gap-y-2">
        {transactionsRequest.isLoading ? (
          <Loader className="animate-spin" />
        ) : !transactionsRequest.data?.data ? (
          <Card className="w-full p-5 text-center text-sm">You don't have any transactions.</Card>
        ) : (
          wallet &&
          transactionsRequest.data.data.map((transaction, i) => (
            <TransactionCard key={i} transaction={transaction} publicAddress={wallet.publicKey} />
          ))
        )}
      </div>
    </div>
  )
}
