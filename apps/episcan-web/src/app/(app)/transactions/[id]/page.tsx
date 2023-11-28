'use client'

import { Card } from '@/components/ui/card'
import { TableRow, TableBody, TableCell, Table } from '@/components/ui/table'
import { fetcher, getRelativeTimeFromTimestamp, shortenString } from '@/lib/utils'
import { Payload, Transaction } from '@epimon/common'
import { BadgeCheck, Copy, LoaderIcon } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

export default function TransactionDetail() {
  const params = useParams()
  const { data } = useSWR<Payload<Transaction>>(`/transactions/${params.id}`, fetcher)

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Transaction details</h1>

      <div className="mt-10">
        {!data ? (
          <Card className="flex justify-center p-10">
            <LoaderIcon className="animate-spin" />
          </Card>
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-gray-500">Transaction</TableCell>
                <TableCell className="flex gap-x-2">
                  <span>{data.data?._id}</span>
                  <Copy
                    className="cursor-pointer"
                    size={20}
                    onClick={() => navigator.clipboard.writeText(params.id.toString())}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-500">Status</TableCell>
                <TableCell className="flex gap-x-2 text-green-500">
                  <BadgeCheck className="cursor-pointer" size={20} />
                  <span>Confirmed</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-500">Signature</TableCell>
                <TableCell className="flex gap-x-1">
                  <span>{data.data?.signature ?? 'Null'}</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-500">Timestamp</TableCell>
                <TableCell className="flex gap-x-1">
                  <span>{getRelativeTimeFromTimestamp(data.data?.timestamp!)}</span>
                  <span className="text-gray-500">
                    ({moment(data.data?.timestamp).format('MMM-DD-YYYY hh:mm:ss A [GMT]Z')})
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-500">From</TableCell>
                <TableCell className="flex gap-x-2">
                  <span className="text-main-blue">
                    {data.data?.senderAddress ? (
                      <Link href={`/address/${data.data.senderAddress}`}>
                        {data.data.senderAddress}
                      </Link>
                    ) : (
                      'System'
                    )}
                  </span>

                  {data.data?.senderAddress && (
                    <Copy
                      className="cursor-pointer"
                      size={20}
                      onClick={() => navigator.clipboard.writeText(data.data?.senderAddress!)}
                    />
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-500">To</TableCell>
                <TableCell className="flex gap-x-2">
                  <span className="text-main-blue">
                    <Link href={`/address/${data.data?.receiverAddress}`}>
                      {data.data?.receiverAddress}
                    </Link>
                  </span>

                  <Copy
                    className="cursor-pointer"
                    size={20}
                    onClick={() => navigator.clipboard.writeText(data.data?.receiverAddress!)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-gray-500">Value</TableCell>
                <TableCell className="flex">
                  <span>{data.data?.amount} EPM</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
