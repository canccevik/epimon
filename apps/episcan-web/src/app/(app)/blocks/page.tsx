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

export default function Blocks() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Blocks</h1>

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
              <TableHead>Block</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Txn No.</TableHead>
              <TableHead>Validated</TableHead>
              <TableHead>Reward</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-main-blue">33694860</TableCell>
              <TableCell>12m ago</TableCell>
              <TableCell className="text-main-blue">146</TableCell>
              <TableCell className="text-main-blue">0x3f...cA749aA1</TableCell>
              <TableCell>0.06795690 EPM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
