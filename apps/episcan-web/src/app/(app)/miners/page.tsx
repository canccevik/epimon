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
import LoaderCard from '@/components/loader-card'
import ErrorCard from '@/components/error-card'
import { appConfig } from '@/config/app'

export default function Miners() {
  const minerCount = 10
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useSWR<Payload<Miner[]>, Payload<null>>(
    `/wallets/miners?page=${page}&limit=${minerCount}`,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Miners</h1>

      <div className="mt-10">
        {error ? (
          <ErrorCard message={error.message} />
        ) : isLoading ? (
          <LoaderCard />
        ) : (
          data && (
            <Table>
              <TableCaption>
                {data.meta && <PaginationSection meta={data.meta} page={page} setPage={setPage} />}
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Total reward</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.data?.map((miner, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{miner.rank}</TableCell>

                      <TableCell className="text-main-blue">
                        <Link href={`/address/${miner.address}`}>
                          {shortenString(miner.address, miner.address.length / 2)}
                        </Link>
                      </TableCell>

                      <TableCell>
                        {miner.totalReward} {appConfig.coinName}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )
        )}
      </div>
    </div>
  )
}
