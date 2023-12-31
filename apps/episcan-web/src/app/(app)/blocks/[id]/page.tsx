'use client'

import ErrorCard from '@/components/error-card'
import LoaderCard from '@/components/loader-card'
import { TableRow, TableBody, TableCell, Table } from '@/components/ui/table'
import { appConfig } from '@/config/app'
import { copyToClipboard, fetcher, getRelativeTimeFromTimestamp, shortenString } from '@/lib/utils'
import { Block, Payload } from '@epimon/common'
import { Copy } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

export default function BlockDetail() {
  const params = useParams()
  const { data, isLoading, error } = useSWR<Payload<Block>, Payload<null>>(
    `/chain/${params.id}`,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Block details</h1>

      <div className="mt-10">
        {error ? (
          <ErrorCard message={error.message} />
        ) : isLoading ? (
          <LoaderCard />
        ) : (
          data &&
          data.data && (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-gray-500">Block ID</TableCell>
                  <TableCell className="flex gap-x-2">
                    <span>{params.id}</span>
                    <Copy
                      className="cursor-pointer"
                      size={20}
                      onClick={() => copyToClipboard(params.id.toString())}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Timestamp</TableCell>
                  <TableCell className="flex gap-x-1">
                    <span>{getRelativeTimeFromTimestamp(data.data.timestamp)}</span>
                    <span className="text-gray-500">
                      ({moment(data.data.timestamp).format('MMM-DD-YYYY hh:mm:ss A [GMT]Z')})
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Transactions</TableCell>
                  <TableCell className="flex gap-x-1">
                    <Link href={`/transactions?block=${data.data._id}`} className="text-main-blue">
                      {data.data.transactions.length} transactions
                    </Link>
                    <span>in this block</span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Validated by</TableCell>
                  <TableCell className="flex flex-col">
                    <span className="text-main-blue">
                      <Link href={`/address/${data.data.miner}`}>
                        {data.data.miner
                          ? shortenString(data.data.miner, data.data.miner.length / 3)
                          : 'System'}
                      </Link>
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Block reward</TableCell>
                  <TableCell className="flex">
                    <span>
                      {data.data.reward} {appConfig.coinName}
                    </span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Difficulty</TableCell>
                  <TableCell className="flex">
                    <span>{data.data.difficulty}</span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Size</TableCell>
                  <TableCell className="flex">
                    <span>{new TextEncoder().encode(JSON.stringify(data.data)).length} bytes</span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Hash</TableCell>
                  <TableCell className="flex">
                    <span>{data.data.hash}</span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Parent Hash</TableCell>
                  <TableCell className="flex">
                    <span>{data.data.previousBlockHash ?? 'Null'}</span>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-gray-500">Nonce</TableCell>
                  <TableCell className="flex">
                    <span>{data.data.nonce}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )
        )}
      </div>
    </div>
  )
}
