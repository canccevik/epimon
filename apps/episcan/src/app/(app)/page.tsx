import { BadgeDollarSign, Cuboid, User2 } from 'lucide-react'
import SearchBanner from './search-banner'
import InfoCard from '@/components/info-card'

export default function Home() {
  return (
    <div className="flex flex-col p-10 gap-y-10">
      <SearchBanner />

      <div className="w-full flex justify-around mt-8">
        <InfoCard title="$121.80" description="EPM Price" icon={<BadgeDollarSign size={30} />} />
        <InfoCard title="33634430" description="Latest Block" icon={<Cuboid size={30} />} />
        <InfoCard title="32" description="Validators" icon={<User2 size={30} />} />
      </div>
    </div>
  )
}
