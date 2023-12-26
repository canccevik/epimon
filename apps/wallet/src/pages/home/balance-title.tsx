import { WalletContext } from '@/context/wallet-context'
import { fetcher } from '@/lib/utils/fetcher'
import { Payload } from '@epimon/common'
import { Loader } from 'lucide-react'
import { useContext } from 'react'
import useSWR from 'swr'

export default function BalanceTitle() {
  const { wallet } = useContext(WalletContext)

  const balanceRequest = useSWR<Payload<{ balance: number }>>(
    `/wallets/${wallet?.publicKey}/balance`,
    fetcher()
  )

  return balanceRequest.isLoading ? (
    <Loader className="animate-spin" />
  ) : (
    balanceRequest.data && (
      <h1 className="text-3xl">
        <span className="font-medium">{balanceRequest.data.data?.balance}</span> EPM
      </h1>
    )
  )
}
