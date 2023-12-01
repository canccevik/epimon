'use client'

import useSWR from 'swr'
import Link from 'next/link'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from './ui/table'
import { fetcher, shortenString } from '@/lib/utils'
import { Block, Payload } from '@epimon/common'
import LoaderCard from './loader-card'

export default function LastFiveBlocks() {
  const { data } = useSWR<Payload<Block[]>>('/chain?page=1&limit=5', fetcher)

  if (!data) {
    return <LoaderCard />
  }

  return (
    <Table>
      <TableCaption>
        <Link href={'/blocks'}>View All Blocks</Link>
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Block</TableHead>
          <TableHead>Miner</TableHead>
          <TableHead>Block Reward</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data &&
          data.data?.map((block, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="font-medium text-main-blue">
                  <Link href={`/blocks/${block._id}`}>{block._id}</Link>
                </TableCell>

                <TableCell>
                  {block.miner ? (
                    <Link href={`/address/${block.miner}`} className="text-main-blue">
                      {shortenString(block.miner)}
                    </Link>
                  ) : (
                    'System'
                  )}
                </TableCell>
                <TableCell>{block.reward} EPM</TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
