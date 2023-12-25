import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal">Epimon Wallet</h1>
      <p className="text-center text-sm">
        A lightweight cryptocurrency wallet, ensuring security and accessibility for all users.
      </p>

      <Button className="w-[350px] mt-5" onClick={() => navigate('/auth/create/create-password')}>
        Create a new wallet
      </Button>

      <Button
        className="w-[350px]"
        variant={'outline'}
        onClick={() => navigate('/auth/import/confirm-secret')}
      >
        Import an existing wallet
      </Button>
    </div>
  )
}
