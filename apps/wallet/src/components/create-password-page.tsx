import { createPasswordSchema } from '@/lib/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordInput from './password-input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'

interface Props {
  onSubmit: (values: FormData) => void
  children: React.ReactNode
}

export type FormData = z.infer<typeof createPasswordSchema>

export default function CreatePasswordPage({ onSubmit, children }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(createPasswordSchema)
  })

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Create a password</h1>
      <p className="text-center text-sm">
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

          <div className="flex flex-col gap-y-4">{children}</div>
        </form>
      </Form>
    </div>
  )
}
