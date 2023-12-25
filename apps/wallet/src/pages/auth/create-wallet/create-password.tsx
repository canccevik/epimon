import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { Loader } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'
import CreatePasswordForm, { FormData } from '@/components/create-password-form'
import { hashPassword } from '@/lib/utils/crypto'

export default function CreatePassword() {
  const { isMutating, trigger } = useSWRMutation('/wallets', fetcher(HttpMethod.POST))

  const navigate = useNavigate()
  const { toast } = useToast()
  const { setWallet, setPassword } = useContext(AuthContext)

  async function onSubmit({ password }: FormData) {
    const { data, statusCode, message } = await trigger({})

    if (statusCode !== 201) {
      return toast({ title: 'Error', description: message })
    }

    setWallet(data)
    setPassword(hashPassword(password))
    navigate('/auth/create/secure-wallet')
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Create a password</h1>
      <p className="text-center text-sm">
        This password will unlock your Epimon wallet only on this device. Epimon can not recover
        this password.
      </p>

      <CreatePasswordForm onSubmit={(values) => onSubmit(values)}>
        <Button type="submit" className="w-full">
          {isMutating ? <Loader className="animate-spin" /> : 'Create a new wallet'}
        </Button>

        <Button className="w-full" variant={'outline'} onClick={() => navigate('/auth')}>
          Go back
        </Button>
      </CreatePasswordForm>
    </div>
  )
}
