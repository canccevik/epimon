import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption
} from '@/components/ui/table'
import { ArrowRight, Copy } from 'lucide-react'

export default function Address() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Address</h1>

      <div className="flex flex-col gap-y-5">
        <div className="flex gap-x-2 mt-5">
          <h6>0xCc8E6d00C17eB431350C6c50d8b8F05176b90b11</h6>
          <Copy className="cursor-pointer" size={20} />
        </div>

        <div className="w-max bg-white p-5 border border-gray-200 rounded-lg">
          <h6>Balance</h6>
          <h1 className="text-3xl mt-2">13.256 EPM</h1>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-lg mb-5">Transactions</h1>

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
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">0x87...f57ca947</TableCell>
              <TableCell className="text-main-blue">33695550</TableCell>
              <TableCell>9m ago</TableCell>
              <TableCell className="text-main-blue">0x24...a6515daa</TableCell>
              <TableCell className="text-main-blue">0x00...00001000</TableCell>
              <TableCell>362 EPM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
