import { XCircle } from 'lucide-react'
import { Card } from './ui/card'

interface Props {
  message: string
}

export default function ErrorCard({ message }: Props) {
  return (
    <Card className="p-10 flex flex-col items-center">
      <XCircle className="mb-5" size={50} />
      {message}
    </Card>
  )
}
