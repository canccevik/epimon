'use client'

import useSWR from 'swr'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from './ui/table'
import { fetcher, shortenString } from '@/lib/utils'
import { Payload, Transaction } from '@epimon/common'
import Link from 'next/link'
import LoaderCard from './loader-card'
import ErrorCard from './error-card'

export default function LastFiveTransactions() {
  const { data, isLoading, error } = useSWR<Payload<Transaction[]>, Payload<null>>(
    '/transactions?page=1&limit=5',
    fetcher
  )

  if (error) {
    return <ErrorCard message={error.message} />
  }

  if (isLoading) {
    return <LoaderCard />
  }

  return (
    data && (
      <Table>
        <TableCaption>
          <Link href={'/transactions'}>View All Transactions</Link>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.data?.map((transaction, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  {transaction._id ? (
                    <Link href={`/transactions/${transaction._id}`} className="text-main-blue">
                      {transaction._id}
                    </Link>
                  ) : (
                    'Null'
                  )}
                </TableCell>

                <TableCell>
                  {transaction.senderAddress ? (
                    <Link href={`/address/${transaction.senderAddress}`} className="text-main-blue">
                      {shortenString(transaction.senderAddress)}
                    </Link>
                  ) : (
                    'System'
                  )}
                </TableCell>

                <TableCell>{transaction.amount} EPM</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  )
}
