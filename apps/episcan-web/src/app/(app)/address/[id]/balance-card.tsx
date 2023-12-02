import ErrorCard from '@/components/error-card'
import { Card } from '@/components/ui/card'
import { copyToClipboard, fetcher, shortenString } from '@/lib/utils'
import { Payload } from '@epimon/common'
import { Copy } from 'lucide-react'
import { useParams } from 'next/navigation'
import LoaderCard from '@/components/loader-card'
import useSWR from 'swr'

export default function BalanceCard() {
  const params = useParams()
  const { data, isLoading, error } = useSWR<Payload<{ balance: number }>, Payload<null>>(
    `/wallets/${params.id}/balance`,
    fetcher
  )

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex gap-x-2 mt-5">
        <h6>{shortenString(params.id.toString(), params.id.length / 4)}</h6>
        <Copy
          className="cursor-pointer"
          size={20}
          onClick={() => copyToClipboard(params.id.toString())}
        />
      </div>

      {error ? (
        <ErrorCard message={error.message} />
      ) : isLoading ? (
        <LoaderCard className="w-max" />
      ) : (
        data &&
        data.data && (
          <Card className="w-max bg-white p-5 border border-gray-200 rounded-lg">
            <h6>Balance</h6>
            <h1 className="text-3xl mt-2">{data.data.balance} EPM</h1>
          </Card>
        )
      )}
    </div>
  )
}
