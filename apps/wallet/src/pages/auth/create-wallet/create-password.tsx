import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { Loader } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'
import CreatePasswordPage, { FormData } from '@/components/create-password-page'
import { hashPassword } from '@/lib/utils/crypto'
import { WalletContext } from '@/context/wallet-context'

export default function CreatePassword() {
  const { isMutating, trigger } = useSWRMutation('/wallets', fetcher(HttpMethod.POST))

  const navigate = useNavigate()
  const { toast } = useToast()
  const { setWallet } = useContext(WalletContext)
  const { setPassword } = useContext(AuthContext)

  async function onSubmit({ password }: FormData) {
    const { data, statusCode, message } = await trigger({})

    if (statusCode !== 201) {
      return toast({ description: message })
    }

    setWallet(data)
    setPassword(hashPassword(password))
    navigate('/auth/create/secure-wallet')
  }

  return (
    <CreatePasswordPage onSubmit={(values) => onSubmit(values)}>
      <Button type="submit" className="w-full">
        {isMutating ? <Loader className="animate-spin" /> : 'Create a new wallet'}
      </Button>

      <Button className="w-full" variant={'outline'} onClick={() => navigate('/auth')}>
        Go back
      </Button>
    </CreatePasswordPage>
  )
}
