import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { createTransactionSchema } from '@/lib/schemas/create-transaction'
import { HttpMethod, fetcher } from '@/lib/utils/fetcher'
import useSWRMutation from 'swr/mutation'
import { Loader } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { z } from 'zod'
import { useWallet } from '@/hooks/use-wallet'
import { Alert } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

type FormData = z.infer<typeof createTransactionSchema>

export default function CreateTransaction() {
  const navigate = useNavigate()
  const { wallet } = useWallet()

  const { isMutating, trigger } = useSWRMutation(
    '/transactions',
    fetcher(HttpMethod.POST, { 'x-private-key': wallet!.privateKey })
  )

  const form = useForm<FormData>({
    resolver: zodResolver(createTransactionSchema)
  })

  async function onSubmit(values: FormData) {
    const data = await trigger(values)

    if (data.statusCode !== 201) {
      return form.setError('root', { message: data.message })
    }

    form.clearErrors()
    form.reset({ amount: 0, receiverAddress: '' })
    toast({ description: 'Transfer is successful.' })
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-8">
      <h1 className="font-normal text-2xl">Create Transaction</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="receiverAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver address</FormLabel>

                <FormControl>
                  <Input placeholder="Wallet address" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>

                <FormControl>
                  <Input type="number" defaultValue={0} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <Alert variant={'destructive'}>{form.formState.errors.root.message}</Alert>
          )}

          <div className="flex flex-col gap-y-4">
            <Button className="w-full font-normal">
              {isMutating ? <Loader className="animate-spin" /> : 'Send'}
            </Button>

            <Button
              className="w-full font-normal"
              variant={'outline'}
              onClick={() => navigate('/')}
            >
              Go back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
