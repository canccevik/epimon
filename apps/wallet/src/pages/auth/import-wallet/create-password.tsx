import { Button } from '@/components/ui/button'
import CreatePasswordPage, { FormData } from '@/components/create-password-page'
import { useAuth } from '@/hooks/use-auth'

export default function CreatePassword() {
  const { login } = useAuth()

  async function onSubmit({ password }: FormData) {
    await login(password)
  }

  return (
    <CreatePasswordPage onSubmit={(e) => onSubmit(e)}>
      <Button type="submit" className="w-full">
        Import my wallet
      </Button>
    </CreatePasswordPage>
  )
}
