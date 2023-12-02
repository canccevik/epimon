'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import { fetcher, getRelativeTimeFromTimestamp, shortenString } from '@/lib/utils'
import { Block, Payload } from '@epimon/common'
import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'
import LoaderCard from '@/components/loader-card'
import ErrorCard from '@/components/error-card'
import { appConfig } from '@/config/app'
import DataTable from '@/components/data-table'

export default function Blocks() {
  const BLOCK_COUNT = 10
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useSWR<Payload<Block[]>, Payload<null>>(
    `/chain?page=${page}&limit=${BLOCK_COUNT}`,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Blocks</h1>

      <div className="mt-10">
        {error ? (
          <ErrorCard message={error.message} />
        ) : isLoading ? (
          <LoaderCard />
        ) : (
          data &&
          data.data && (
            <DataTable
              data={data}
              page={page}
              setPage={setPage}
              headings={['Block', 'Age', 'Mined by', 'Reward']}
            >
              {data.data.map((block, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="text-main-blue">
                      <Link href={`/blocks/${block._id}`}>{block._id}</Link>
                    </TableCell>

                    <TableCell>{getRelativeTimeFromTimestamp(block.timestamp)}</TableCell>

                    <TableCell>
                      {block.miner ? (
                        <Link href={`/address/${block.miner}`} className="text-main-blue">
                          {shortenString(block.miner, block.miner.length / 3)}
                        </Link>
                      ) : (
                        'System'
                      )}
                    </TableCell>

                    <TableCell>
                      {block.reward} {appConfig.coinName}
                    </TableCell>
                  </TableRow>
                )
              })}
            </DataTable>
          )
        )}
      </div>
    </div>
  )
}
