'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { TableRow, TableCell } from './ui/table'
import { fetcher, shortenString } from '@/lib/utils'
import { Block, Payload } from '@epimon/common'
import LoaderCard from './loader-card'
import ErrorCard from './error-card'
import { appConfig } from '@/config/app'
import DataTable from './data-table'

export default function LastFiveBlocks() {
  const { data, isLoading, error } = useSWR<Payload<Block[]>, Payload<null>>(
    '/chain?page=1&limit=5',
    fetcher
  )

  if (error) {
    return <ErrorCard message={error.message} />
  } else if (isLoading) {
    return <LoaderCard />
  }

  return (
    <DataTable
      data={data}
      link={<Link href={'/blocks'}>View All Blocks</Link>}
      headings={['Block', 'Miner', 'Block reward']}
    >
      {data &&
        data.data &&
        data.data.map((block, i) => (
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

            <TableCell>
              {block.reward} {appConfig.coinName}
            </TableCell>
          </TableRow>
        ))}
    </DataTable>
  )
}
