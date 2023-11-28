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
import { LoaderIcon } from 'lucide-react'
import { Card } from './ui/card'

export default function LastFiveBlocks() {
  const { data } = useSWR<Payload<Block[]>>('/chain?page=1&limit=5', fetcher)

  if (!data) {
    return (
      <Card className="w-full flex justify-center p-10 shadow-none">
        <LoaderIcon className="animate-spin" />
      </Card>
    )
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
                  <Link href={`/address/${block.miner}`} className="text-main-blue truncate">
                    {block.miner ? shortenString(block.miner) : 'System'}
                  </Link>
                </TableCell>
                <TableCell>{block.reward} EPM</TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
