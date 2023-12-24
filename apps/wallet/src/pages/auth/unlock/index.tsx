import { unlockSchema } from '@/lib/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useStorage } from '@/hooks/use-storage'
import { hashPassword } from '@/lib/utils/crypto'
import { PASSWORD } from '@/lib/constants'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

export type FormData = z.infer<typeof unlockSchema>

export default function Unlock() {
  const navigate = useNavigate()
  const { getItem } = useStorage()

  const form = useForm<FormData>({
    resolver: zodResolver(unlockSchema)
  })

  async function onSubmit({ password }: FormData) {
    const hashedPassword = hashPassword(password)
    const correctPassword = await getItem(PASSWORD)

    if (correctPassword !== hashedPassword) {
      return toast({ description: 'Wrong password!', variant: 'destructive' })
    }
    navigate('/')
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Welcome back!</h1>
      <p className="text-center">Enter your password to unlock your wallet.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Unlock
          </Button>
        </form>
      </Form>
    </div>
  )
}
