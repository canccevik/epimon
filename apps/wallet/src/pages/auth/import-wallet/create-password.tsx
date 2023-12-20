import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import useSWRMutation from 'swr/mutation'
import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import { Loader } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'
import CreatePasswordForm, { FormData } from '@/components/create-password-form'

export default function CreatePassword() {
  const { isMutating, trigger } = useSWRMutation('/wallets', fetcher(HttpMethod.POST))

  const navigate = useNavigate()
  const { toast } = useToast()
  const { setWallet } = useContext(AuthContext)

  async function onSubmit(values: FormData) {
    const { data, statusCode, message } = await trigger({})

    if (statusCode !== 201) {
      return toast({ title: 'Error', description: message })
    }

    setWallet(data)
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Create a password</h1>
      <p className="text-center">
        This password will unlock your Epimon wallet only on this device. Epimon can not recover
        this password.
      </p>

      <CreatePasswordForm onSubmit={onSubmit}>
        <Button type="submit" className="w-full">
          {isMutating ? <Loader className="animate-spin" /> : 'Import my wallet'}
        </Button>
      </CreatePasswordForm>
    </div>
  )
}
