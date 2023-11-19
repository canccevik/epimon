import { BadgeDollarSign, Cuboid, User2 } from 'lucide-react'
import SearchBanner from './search-banner'
import InfoCard from '@/components/info-card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col p-10 gap-y-10">
      <SearchBanner />

      <div className="w-full flex justify-between mt-8">
        <InfoCard title="$121.80" description="EPM Price" icon={<BadgeDollarSign size={30} />} />
        <InfoCard title="33634430" description="Latest Block" icon={<Cuboid size={30} />} />
        <InfoCard title="32" description="Validators" icon={<User2 size={30} />} />
      </div>

      <div className="flex justify-between gap-x-10">
        <div className="w-6/12">
          <h1 className="text-lg">The latest 5 Blocks</h1>

          <div className="mt-5 bg-white rounded-lg p-3 border-gray-200 border">
            <Table>
              <TableCaption>
                <Link href={'/blocks'}>View All Blocks</Link>
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Block</TableHead>
                  <TableHead>Validated</TableHead>
                  <TableHead>Block Reward</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">33635052</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72EBea1s
                    </a>
                  </TableCell>
                  <TableCell>0.06467 EPM</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">33635052</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72EBea1s
                    </a>
                  </TableCell>
                  <TableCell>0.06467 EPM</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">33635052</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72EBea1s
                    </a>
                  </TableCell>
                  <TableCell>0.06467 EPM</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">33635052</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72EBea1s
                    </a>
                  </TableCell>
                  <TableCell>0.06467 EPM</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">33635052</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72EBea1s
                    </a>
                  </TableCell>
                  <TableCell>0.06467 EPM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="w-6/12">
          <h1 className="text-lg">The latest 5 Transactions</h1>

          <div className="mt-5 bg-white rounded-lg p-3 border-gray-200 border">
            <Table>
              <TableCaption>
                <Link href={'/transactions'}>View All Transactions</Link>
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Txn Hash</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">0x13...9e49738e</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72ebea1
                    </a>
                  </TableCell>
                  <TableCell>0.05366 EPM</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">0x13...9e49738e</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72ebea1
                    </a>
                  </TableCell>
                  <TableCell>0.05366 EPM</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">0x13...9e49738e</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72ebea1
                    </a>
                  </TableCell>
                  <TableCell>0.05366 EPM</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">0x13...9e49738e</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72ebea1
                    </a>
                  </TableCell>
                  <TableCell>0.05366 EPM</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium text-[#534FFF]">0x13...9e49738e</TableCell>
                  <TableCell>
                    <a href="/" className="text-[#534FFF]">
                      0xe2...c72ebea1
                    </a>
                  </TableCell>
                  <TableCell>0.05366 EPM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
