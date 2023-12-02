'use client'

import useSWR from 'swr'
import { TableRow, TableCell } from './ui/table'
import { fetcher, shortenString } from '@/lib/utils'
import { Payload, Transaction } from '@epimon/common'
import Link from 'next/link'
import LoaderCard from './loader-card'
import ErrorCard from './error-card'
import { appConfig } from '@/config/app'
import DataTable from './data-table'

export default function LastFiveTransactions() {
  const { data, isLoading, error } = useSWR<Payload<Transaction[]>, Payload<null>>(
    '/transactions?page=1&limit=5',
    fetcher
  )

  if (error) {
    return <ErrorCard message={error.message} />
  } else if (isLoading) {
    return <LoaderCard />
  }

  return (
    data &&
    data.data && (
      <DataTable
        data={data}
        link={<Link href={'/transactions'}>View All Transactions</Link>}
        headings={['Transaction', 'From', 'Value']}
      >
        {data.data.map((transaction, i) => (
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

            <TableCell>
              {transaction.amount} {appConfig.coinName}
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    )
  )
}
