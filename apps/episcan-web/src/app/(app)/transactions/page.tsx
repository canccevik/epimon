'use client'

import PaginationSection from '@/components/pagination-section'
import { Card } from '@/components/ui/card'
import { fetcher, getRelativeTimeFromTimestamp, shortenString } from '@/lib/utils'
import { Payload, Transaction } from '@epimon/common'
import { useSearchParams } from 'next/navigation'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default function Transactions() {
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)
  const transactionCount = 10
  const blockId = searchParams.get('block')

  const txsEndpoint = `/transactions?page=${page}&limit=${transactionCount}`
  const txsEndpointWithBlock = txsEndpoint + `&blockId=${blockId}`

  const { data } = useSWR<Payload<Transaction[]>>(
    blockId ? txsEndpointWithBlock : txsEndpoint,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Transactions</h1>

      {blockId && (
        <span className="mt-3">
          From Block [
          <Link href={`/blocks/${blockId}`} className="text-main-blue">
            {blockId}
          </Link>
          ]
        </span>
      )}

      <div className="mt-10">
        {!data ? (
          <Card className="flex justify-center p-10">
            <LoaderIcon className="animate-spin" />
          </Card>
        ) : (
          <Table>
            <TableCaption>
              {data.meta && <PaginationSection meta={data.meta} page={page} setPage={setPage} />}
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Signature</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.data?.map((transaction, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      {transaction._id ? (
                        <Link href={`/transactions/${transaction._id}`} className="text-main-blue">
                          {transaction._id}
                        </Link>
                      ) : (
                        'Null'
                      )}
                    </TableCell>

                    <TableCell>
                      {transaction.signature ? shortenString(transaction.signature) : 'Null'}
                    </TableCell>

                    <TableCell>{getRelativeTimeFromTimestamp(transaction.timestamp)}</TableCell>

                    <TableCell>
                      {transaction.senderAddress ? (
                        <Link
                          href={`/address/${transaction.senderAddress}`}
                          className="text-main-blue"
                        >
                          {shortenString(transaction.senderAddress)}
                        </Link>
                      ) : (
                        'System'
                      )}
                    </TableCell>

                    <TableCell className="text-main-blue">
                      <Link href={`/address/${transaction.receiverAddress}`}>
                        {shortenString(transaction.receiverAddress)}
                      </Link>
                    </TableCell>

                    <TableCell className="text-green-500">Confirmed</TableCell>

                    <TableCell>{transaction.amount} EPM</TableCell>
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
