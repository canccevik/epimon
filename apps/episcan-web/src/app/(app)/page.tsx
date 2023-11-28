import { BadgeDollarSign, Cuboid, User2 } from 'lucide-react'
import SearchBanner from './search-banner'
import InfoCard from '@/components/info-card'
import LastFiveBlocks from '@/components/last-five-blocks'
import LastFiveTransactions from '@/components/last-five-transactions'

export default function Home() {
  return (
    <div className="flex flex-col gap-y-10">
      <SearchBanner />

      <div className="w-full flex justify-between mt-8">
        <InfoCard title="$121.80" description="EPM Price" icon={<BadgeDollarSign size={30} />} />
        <InfoCard title="33634430" description="Latest Block" icon={<Cuboid size={30} />} />
        <InfoCard title="32" description="Miners" icon={<User2 size={30} />} />
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
