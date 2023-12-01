import { Loader } from 'lucide-react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export default function LoaderCard({ className }: Props) {
  return (
    <Card className={cn('flex justify-center p-10 shadow-none', className)}>
      <Loader className="animate-spin" />
    </Card>
  )
}
