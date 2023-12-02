'use client'

import ErrorCard from '@/components/error-card'
import LoaderCard from '@/components/loader-card'
import { TableRow, TableBody, TableCell, Table } from '@/components/ui/table'
import { fetcher, getRelativeTimeFromTimestamp } from '@/lib/utils'
import { Payload, TransactionWithStatus } from '@epimon/common'
import { BadgeCheck, Copy, Loader } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

export default function TransactionDetail() {
  const params = useParams()
  const { data, isLoading, error } = useSWR<Payload<TransactionWithStatus>, Payload<null>>(
    `/transactions/${params.id}`,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Transaction details</h1>

      <div className="mt-10">
        {error ? (
          <ErrorCard message={error.message} />
        ) : isLoading ? (
          <LoaderCard />
        ) : (
          data && (
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

                  <TableCell>
                    {data.data?.isConfirmed ? (
                      <div className="flex text-green-500 gap-x-2">
                        <BadgeCheck className="cursor-pointer" size={20} />
                        <span>Confirmed</span>
                      </div>
                    ) : (
                      <div className="flex text-orange-500 gap-x-2">
                        <Loader className="cursor-pointer" size={20} />
                        <span>Pending</span>
                      </div>
                    )}
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
                    <span>
                      {data.data?.senderAddress ? (
                        <Link
                          href={`/address/${data.data.senderAddress}`}
                          className="text-main-blue"
                        >
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
          )
        )}
      </div>
    </div>
  )
}
