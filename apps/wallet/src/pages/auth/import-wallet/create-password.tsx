import { Button } from '@/components/ui/button'
import CreatePasswordForm, { FormData } from '@/components/create-password-form'
import { useAuth } from '@/hooks/use-auth'

export default function CreatePassword() {
  const { login } = useAuth()

  async function onSubmit({ password }: FormData) {
    await login(password)
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Create a password</h1>
      <p className="text-center text-sm">
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
