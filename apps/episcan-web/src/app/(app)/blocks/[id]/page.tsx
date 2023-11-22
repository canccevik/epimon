import { TableRow, TableBody, TableCell, Table } from '@/components/ui/table'
import { Copy } from 'lucide-react'

export default function BlockDetail() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Block details</h1>

      <div className="mt-10">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-gray-500">Block ID</TableCell>
              <TableCell className="flex gap-x-2">
                <span>655769124363c3efcb13d573</span>
                <Copy className="cursor-pointer" size={20} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Timestamp</TableCell>
              <TableCell className="flex gap-x-1">
                <span>14m 51s ago</span>
                <span className="text-gray-500">(Nov-22-2023 04:54:41 PM +UTC)</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Transactions</TableCell>
              <TableCell className="flex gap-x-1">
                <span className="text-main-blue">97 transactions</span>
                <span>in this block</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Validated by</TableCell>
              <TableCell className="flex flex-col">
                <span className="text-main-blue">0x70f657164e5b75689b64b7fd1fa275f334f28e18</span>
                <span>in 5 seconds</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Block</TableCell>
              <TableCell className="flex gap-x-1">
                <span className="text-main-blue">33720482</span>
                <span>72 Block Confirmations</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Block reward</TableCell>
              <TableCell className="flex">
                <span>7.05 EPM</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Difficulty</TableCell>
              <TableCell className="flex">
                <span>5</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Size</TableCell>
              <TableCell className="flex">
                <span>1,524 bytes</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Hash</TableCell>
              <TableCell className="flex">
                <span>0x8d0dc3dbba79419165a2c1147bfd2752bd8307476c3dc107a8a2945a4af807c7</span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Parent Hash</TableCell>
              <TableCell className="flex">
                <span className="text-main-blue">
                  0x6a120cd635b7d6c3fe1d4d560ced5c8902dff716c635590493f00aba1c63909b
                </span>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-gray-500">Nonce</TableCell>
              <TableCell className="flex">
                <span>435932</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
