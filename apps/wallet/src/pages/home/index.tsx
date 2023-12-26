import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { WalletContext } from '@/context/wallet-context'
import { useAuth } from '@/hooks/use-auth'
import { copyToClipboard } from '@/lib/utils'
import { Copy } from 'lucide-react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import BalanceTitle from './balance-title'
import LatestTransactions from './latest-transactions'

export default function Home() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { wallet } = useContext(WalletContext)

  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <div className="w-full text-center">
        <BalanceTitle />

        <h1 className="text-sm mb-3">Wallet Address</h1>

        <Card className="w-full flex justify-center gap-x-2 p-3 font-normal overflow-hidden">
          {wallet && (
            <>
              {wallet.publicKey.slice(0, 40) + '...'}
              <Copy
                className="cursor-pointer"
                size={16}
                onClick={() => copyToClipboard(wallet.publicKey)}
              />
            </>
          )}
        </Card>
      </div>

      <div className="w-full flex flex-wrap md:flex-nowrap gap-3">
        <Button
          className="w-full font-normal"
          size={'lg'}
          onClick={() => navigate('/create-transaction')}
        >
          Create transaction
        </Button>

        <Button className="w-full font-normal" size={'lg'} onClick={() => logout()}>
          Logout
        </Button>
      </div>

      <LatestTransactions />
    </div>
  )
}
