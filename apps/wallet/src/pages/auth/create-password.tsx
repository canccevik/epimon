import { Button, buttonVariants } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPasswordSchema } from '@/lib/schemas/auth'
import PasswordInput from '@/components/password-input'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import { useNavigate } from 'react-router-dom'

type FormData = z.infer<typeof createPasswordSchema>

export default function CreatePassword() {
  const navigate = useNavigate()

  const form = useForm<FormData>({
    resolver: zodResolver(createPasswordSchema)
  })

  function onSubmit(values: FormData) {}

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Create a password</h1>
      <p className="text-center">
        This password will unlock your Epimon wallet only on this device. Epimon can not recover
        this password.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>

                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>

                {!form.formState.errors.password ? (
                  <FormDescription>
                    A strong password can improve the security of your wallet should your device be
                    stolen or compromised.
                  </FormDescription>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>

                <FormControl>
                  <PasswordInput placeholder="Password again" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-y-4">
            <Button
              type="submit"
              className={cn('w-full', buttonVariants())}
              onClick={() => navigate('/secure-wallet')}
            >
              Create a new wallet
            </Button>

            <a href="/" className={cn('w-full', buttonVariants({ variant: 'outline' }))}>
              Go back
            </a>
          </div>
        </form>
      </Form>
    </div>
  )
}
