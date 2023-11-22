import { TableRow, TableBody, TableCell, Table } from '@/components/ui/table'
import { BadgeCheck, Copy } from 'lucide-react'

export default function TransactionDetail() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Transaction details</h1>

      <div className="mt-10">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-gray-500">Txn hash</TableCell>
              <TableCell className="flex gap-x-2">
                <span>0xe6cb7a609118cc85baed58d786cdc5ab4f9e0844b011a52374bd3ac6fc1260d9</span>
                <Copy className="cursor-pointer" size={20} />
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
              <TableCell className="text-gray-500">Block</TableCell>
              <TableCell className="flex gap-x-2">
                <span className="text-main-blue">33720482</span>
                <span>72 Block Confirmations</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Timestamp</TableCell>
              <TableCell className="flex gap-x-2">
                <span>14m 51s ago</span>
                <span className="text-gray-500">(Nov-22-2023 04:54:41 PM +UTC)</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">From</TableCell>
              <TableCell className="flex gap-x-2">
                <span className="text-main-blue">0x70f657164e5b75689b64b7fd1fa275f334f28e18</span>
                <Copy className="cursor-pointer" size={20} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">To</TableCell>
              <TableCell className="flex gap-x-2">
                <span className="text-main-blue">0x55d398326f99059ff775485246999027b3197955</span>
                <Copy className="cursor-pointer" size={20} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Value</TableCell>
              <TableCell className="flex gap-x-2">
                <span>120 EPM</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
