import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ArrowRight } from 'lucide-react'

export default function Transactions() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Transactions</h1>

      <div className="mt-10">
        <Table>
          <TableCaption>
            <div className="flex gap-x-2 ml-5">
              <Button className="bg-main-black" size={'sm'}>
                1
              </Button>

              <Button className="bg-main-black" size={'sm'}>
                2
              </Button>

              <Button className="bg-main-black" size={'sm'}>
                3
              </Button>

              <Button className="bg-main-black" size={'sm'}>
                4
              </Button>

              <span className="text-2xl font-medium">...</span>

              <Button className="bg-main-black" size={'sm'}>
                500
              </Button>

              <Button className="bg-main-black" size={'sm'}>
                <span>Next</span> <ArrowRight size={16} />
              </Button>
            </div>
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Txn Hash</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-green-500">Confirmed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell className="text-red-500">Failed</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
