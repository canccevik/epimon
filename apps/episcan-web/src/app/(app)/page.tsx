'use client'

import { Cuboid, FileText, User2 } from 'lucide-react'
import SearchBanner from './search-banner'
import InfoCard from '@/components/info-card'
import LastFiveBlocks from '@/components/last-five-blocks'
import LastFiveTransactions from '@/components/last-five-transactions'
import useSWR from 'swr'
import { Block, Miner, Payload, Transaction } from '@epimon/common'
import { fetcher } from '@/lib/utils'

export default function Home() {
  const txsRequest = useSWR<Payload<Transaction[]>>('/transactions?page=1&limit=1', fetcher)
  const blocksRequest = useSWR<Payload<Block[]>>('/chain?page=1&limit=1', fetcher)
  const minersRequest = useSWR<Payload<Miner>>('/wallets/miners', fetcher)

  return (
    <div className="flex flex-col gap-y-10">
      <SearchBanner />

      <div className="w-full flex justify-between mt-8">
        <InfoCard
          title={blocksRequest.data?.meta?.totalRecords.toString()}
          description="Blocks"
          icon={<Cuboid size={30} />}
          isLoading={blocksRequest.isLoading}
        />

        <InfoCard
          title={txsRequest.data?.meta?.totalRecords.toString()}
          description="Transactions"
          icon={<FileText size={30} />}
          isLoading={txsRequest.isLoading}
        />

        <InfoCard
          title={minersRequest.data?.meta?.totalRecords.toString()}
          description="Miners"
          icon={<User2 size={30} />}
          isLoading={minersRequest.isLoading}
        />
      </div>

      <div className="flex justify-between gap-x-10">
        <div className="w-6/12">
          <h1 className="text-lg">The latest 5 Blocks</h1>

          <div className="mt-5">
            <LastFiveBlocks />
          </div>
        </div>

        <div className="w-6/12">
          <h1 className="text-lg">The latest 5 Transactions</h1>

          <div className="mt-5">
            <LastFiveTransactions />
          </div>
        </div>
      </div>
    </div>
  )
}
