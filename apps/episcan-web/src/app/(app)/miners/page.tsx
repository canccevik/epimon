import { Button } from '@/components/ui/button'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { ArrowRight } from 'lucide-react'

export default function Miners() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-wide">Miners</h1>

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
              <TableHead>Rank</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Total reward</TableHead>
              <TableHead>Active</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-green-500">Yes</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>2</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-red-500">No</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>3</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-green-500">Yes</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>4</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-red-500">No</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>5</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-green-500">Yes</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>6</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-red-500">No</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>7</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-green-500">Yes</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>8</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-red-500">No</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>9</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-green-500">Yes</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>10</TableCell>
              <TableCell className="text-main-blue">
                0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a
              </TableCell>
              <TableCell>16279 EPM</TableCell>
              <TableCell className="text-red-500">No</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
