'use client'

import PaginationSection from '@/components/pagination-section'
import { Card } from '@/components/ui/card'
import { fetcher, getRelativeTimeFromTimestamp, shortenString } from '@/lib/utils'
import { Payload, Transaction } from '@epimon/common'
import { Copy } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useSWR from 'swr'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption
} from '@/components/ui/table'
import Link from 'next/link'
import TableLoader from '@/components/loader-card'
import ErrorCard from '@/components/error-card'

export default function Address() {
  const transactionCount = 10
  const [page, setPage] = useState(1)
  const params = useParams()

  const balanceRequest = useSWR<Payload<{ balance: number }>, Payload<null>>(
    `/wallets/${params.id}/balance`,
    fetcher
  )
  const txsRequest = useSWR<Payload<Transaction[]>, Payload<null>>(
    `/wallets/${params.id}/transactions?page=${page}&limit=${transactionCount}`,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Address</h1>

      <div className="flex flex-col gap-y-5">
        <div className="flex gap-x-2 mt-5">
          <h6>{shortenString(params.id.toString(), params.id.length / 4)}</h6>
          <Copy
            className="cursor-pointer"
            size={20}
            onClick={() => navigator.clipboard.writeText(params.id.toString())}
          />
        </div>

        {balanceRequest.error ? (
          <ErrorCard message={balanceRequest.error.message} />
        ) : balanceRequest.isLoading ? (
          <TableLoader className="w-max" />
        ) : (
          balanceRequest.data && (
            <Card className="w-max bg-white p-5 border border-gray-200 rounded-lg">
              <h6>Balance</h6>
              <h1 className="text-3xl mt-2">{balanceRequest.data.data?.balance} EPM</h1>
            </Card>
          )
        )}
      </div>

      <div className="mt-10">
        <h1 className="text-lg mb-5">Transactions</h1>

        {txsRequest.error ? (
          <ErrorCard message={txsRequest.error.message} />
        ) : txsRequest.isLoading ? (
          <TableLoader />
        ) : (
          txsRequest.data && (
            <Table>
              <TableCaption>
                {txsRequest.data.meta && (
                  <PaginationSection meta={txsRequest.data.meta} page={page} setPage={setPage} />
                )}
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Signature</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {txsRequest.data.data?.map((transaction, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        {transaction._id ? (
                          <Link
                            href={`/transactions/${transaction._id}`}
                            className="text-main-blue"
                          >
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

                      <TableCell>{transaction.amount} EPM</TableCell>
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
