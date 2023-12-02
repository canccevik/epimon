'use client'

import { fetcher, getRelativeTimeFromTimestamp, shortenString } from '@/lib/utils'
import { Payload, Transaction } from '@epimon/common'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import LoaderCard from '@/components/loader-card'
import ErrorCard from '@/components/error-card'
import BalanceCard from './balance-card'
import { TableRow, TableCell } from '@/components/ui/table'
import DataTable from '@/components/data-table'
import { appConfig } from '@/config/app'

export default function Address() {
  const TRANSACTION_COUNT = 10

  const params = useParams()
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useSWR<Payload<Transaction[]>, Payload<null>>(
    `/wallets/${params.id}/transactions?page=${page}&limit=${TRANSACTION_COUNT}`,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Address</h1>

      <BalanceCard />

      <div className="mt-10">
        <h1 className="text-lg mb-5">Transactions</h1>

        {error ? (
          <ErrorCard message={error.message} />
        ) : isLoading ? (
          <LoaderCard />
        ) : (
          data && (
            <DataTable
              data={data}
              page={page}
              setPage={setPage}
              headings={['Transaction', 'Signature', 'Age', 'From', 'To', 'Value']}
            >
              {data.data?.map((transaction, i) => (
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

                  <TableCell>
                    {transaction.amount} {appConfig.coinName}
                  </TableCell>
                </TableRow>
              ))}
            </DataTable>
          )
        )}
      </div>
    </div>
  )
}
