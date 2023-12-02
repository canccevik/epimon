import PaginationSection from './pagination-section'
import { Payload } from '@epimon/common'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody } from './ui/table'

interface Props<T> {
  data: Payload<T[]>
  headings: string[]
  page: number
  setPage: Function
  children: React.ReactNode
}

export default function DataTable<T>({ data, headings, page, setPage, children: body }: Props<T>) {
  return (
    <Table>
      <TableCaption>
        {data.meta && <PaginationSection meta={data.meta} page={page} setPage={setPage} />}
      </TableCaption>

      <TableHeader>
        <TableRow>
          {headings.map((heading, i) => (
            <TableHead key={i}>{heading}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>{body}</TableBody>
    </Table>
  )
}
