'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { fetcher, getRelativeTimeFromTimestamp, shortenString } from '@/lib/utils'
import { Block, Payload } from '@epimon/common'
import Link from 'next/link'
import useSWR from 'swr'
import PaginationSection from '@/components/pagination-section'
import { useState } from 'react'
import TableLoader from '@/components/loader-card'
import ErrorCard from '@/components/error-card'

export default function Blocks() {
  const blockCount = 10
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useSWR<Payload<Block[]>, Payload<null>>(
    `/chain?page=${page}&limit=${blockCount}`,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Blocks</h1>

      <div className="mt-10">
        {error ? (
          <ErrorCard message={error.message} />
        ) : isLoading ? (
          <TableLoader />
        ) : (
          data && (
            <Table>
              <TableCaption>
                {data.meta && <PaginationSection meta={data.meta} page={page} setPage={setPage} />}
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Block</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Mined by</TableHead>
                  <TableHead>Reward</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.data?.map((block, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="text-main-blue">
                        <Link href={`/blocks/${block._id}`}>{block._id}</Link>
                      </TableCell>

                      <TableCell>{getRelativeTimeFromTimestamp(block.timestamp)}</TableCell>

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
        )}
      </div>
    </div>
  )
}
