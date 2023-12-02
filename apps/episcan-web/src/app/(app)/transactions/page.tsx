'use client'

import { fetcher, getRelativeTimeFromTimestamp, shortenString } from '@/lib/utils'
import { Payload, TransactionWithStatus } from '@epimon/common'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import { TableCell, TableRow } from '@/components/ui/table'
import LoaderCard from '@/components/loader-card'
import ErrorCard from '@/components/error-card'
import { appConfig } from '@/config/app'
import DataTable from '@/components/data-table'

export default function Transactions() {
  const searchParams = useSearchParams()
  const [page, setPage] = useState(1)

  const TRANSACTION_COUNT = 10
  const blockId = searchParams.get('block')

  const txsEndpoint = `/transactions?page=${page}&limit=${TRANSACTION_COUNT}`
  const txsInBlockEndpoint = txsEndpoint + `&blockId=${blockId}`

  const { data, isLoading, error } = useSWR<Payload<TransactionWithStatus[]>, Payload<null>>(
    blockId ? txsInBlockEndpoint : txsEndpoint,
    fetcher
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Transactions</h1>

      {blockId && data && (
        <span className="mt-3">
          From Block [
          <Link href={`/blocks/${blockId}`} className="text-main-blue">
            {blockId}
          </Link>
          ]
        </span>
      )}

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
              headings={['Transaction', 'Signature', 'Age', 'From', 'To', 'Status', 'Value']}
            >
              {data.data.map((transaction, i) => {
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

                    <TableCell>
                      {transaction.isConfirmed ? (
                        <span className="text-green-500">Confirmed</span>
                      ) : (
                        <span className="text-orange-500">Pending</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {transaction.amount} {appConfig.coinName}
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
