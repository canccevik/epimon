import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth-context'
import CreatePasswordForm, { FormData } from '@/components/create-password-form'
import { useStorage } from '@/hooks/use-storage'
import { PASSWORD, SECRET_PHRASE } from '@/lib/constants'
import { encryptWithPassword } from '@/lib/utils/crypto'

export default function CreatePassword() {
  const navigate = useNavigate()
  const { setItem } = useStorage()
  const { wallet } = useContext(AuthContext)

  async function onSubmit({ password }: FormData) {
    await setItem(PASSWORD, password)
    await setItem(SECRET_PHRASE, encryptWithPassword(wallet!.secretPhrase, password))
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Create a password</h1>
      <p className="text-center">
        This password will unlock your Epimon wallet only on this device. Epimon can not recover
        this password.
      </p>

      <CreatePasswordForm onSubmit={(e) => onSubmit(e)}>
        <Button type="submit" className="w-full">
          Import my wallet
        </Button>
      </CreatePasswordForm>
    </div>
  )
}
