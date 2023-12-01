'use client'

import PaginationSection from '@/components/pagination-section'
import { Miner, Payload } from '@epimon/common'
import { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { fetcher, shortenString } from '@/lib/utils'
import TableLoader from '@/components/loader-card'

export default function Miners() {
  const minerCount = 10
  const [page, setPage] = useState(1)

  const { data } = useSWR<Payload<Miner[]>>(
    `/wallets/miners?page=${page}&limit=${minerCount}`,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Miners</h1>

      <div className="mt-10">
        {!data ? (
          <TableLoader />
        ) : (
          <Table>
            <TableCaption>
              {data?.meta && <PaginationSection meta={data.meta} page={page} setPage={setPage} />}
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Total reward</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((miner, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{miner.rank}</TableCell>

                    <TableCell className="text-main-blue">
                      <Link href={`/address/${miner.address}`}>{shortenString(miner.address)}</Link>
                    </TableCell>

                    <TableCell>{miner.totalReward} EPM</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
