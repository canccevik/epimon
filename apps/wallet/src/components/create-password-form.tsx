import { createPasswordSchema } from '@/lib/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordInput from './password-input'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { z } from 'zod'

interface Props {
  onSubmit: (values: FormData) => void
  children: React.ReactNode
}

export type FormData = z.infer<typeof createPasswordSchema>

export default function CreatePasswordForm({ onSubmit, children }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(createPasswordSchema)
  })

  return (
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
  )
}
