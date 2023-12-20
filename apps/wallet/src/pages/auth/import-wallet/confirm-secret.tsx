import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'

export default function ConfirmSecret() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">
        Access your wallet with your Secret Recovery Phrase
      </h1>
      <p className="text-center">
        We will use your Secret Recovery Phrase to validate your ownership. Enter the Secret
        Recovery Phrase that you were given when you created your wallet.
      </p>

      <Card className="w-full p-5 select-none">
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i} className="p-3 rounded-sm flex items-center gap-x-2 shadow-none">
              <span className="text-gray-600">{i + 1}.</span>
              <Input className="font-light text-center p-0 disabled:text-black" />
            </Card>
          ))}
        </div>
      </Card>

      <Button className="w-full" onClick={() => navigate('/auth/import/create-password')}>
        Confirm Secret Recovery Phrase
      </Button>
    </div>
  )
}
