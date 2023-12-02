import PaginationSection from './pagination-section'
import { Payload } from '@epimon/common'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody } from './ui/table'

interface Props<T> {
  data: Payload<T | T[]> | undefined
  headings: string[]
  page?: number
  setPage?: Function
  link?: React.ReactNode
  children: React.ReactNode
}

export default function DataTable<T>({ data, headings, page, setPage, link, children }: Props<T>) {
  return (
    data && (
      <Table>
        {link && <TableCaption>{link}</TableCaption>}

        {data.meta && page && setPage && (
          <TableCaption>
            <PaginationSection meta={data.meta} page={page} setPage={setPage} />
          </TableCaption>
        )}

        <TableHeader>
          <TableRow>
            {headings.map((heading, i) => (
              <TableHead key={i}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>{children}</TableBody>
      </Table>
    )
  )
}
