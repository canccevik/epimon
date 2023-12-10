import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { confirmSecretSchema } from '@/lib/schemas/auth'
import { cn, getRandomWordsFromText } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormData = z.infer<typeof confirmSecretSchema>

const secretPhrase = 'tobacco captain flush ship stay base patient garlic nephew special bag loyal'
const randomWords = getRandomWordsFromText(secretPhrase, 3)

export default function ConfirmSecret() {
  const [isSecretConfirmed, setIsSecretConfirmed] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(confirmSecretSchema),
    defaultValues: {
      word1: '',
      word2: '',
      word3: ''
    }
  })

  useEffect(() => {
    form.watch(() => {
      const isConfirmed =
        form.getValues().word1 === randomWords[0] &&
        form.getValues().word2 === randomWords[1] &&
        form.getValues().word3 === randomWords[2]

      setIsSecretConfirmed(isConfirmed)
    })
  }, [form, form.watch])

  function onSubmit(values: FormData) {}

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Confirm Secret Recovery Phrase</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <Card className="w-full p-5 select-none">
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              {secretPhrase.split(' ').map((word, i) => (
                <Card key={i} className="p-3 rounded-sm flex items-center">
                  <div className="flex items-center gap-x-2 text-gray-500">
                    <span>{i + 1}.</span>
                    {randomWords.includes(word) ? (
                      <FormField
                        control={form.control}
                        name={('word' + (randomWords.indexOf(word) + 1).toString()) as never}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input className="p-0 text-center" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ) : (
                      <Input
                        className="p-0 text-center disabled:text-black"
                        value={word}
                        disabled
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <div className="flex flex-col gap-y-4">
            <Button type="submit" className="w-full" disabled={!isSecretConfirmed}>
              Create wallet
            </Button>

            <a
              href="/secure-wallet"
              className={cn('w-full', buttonVariants({ variant: 'outline' }))}
            >
              Go back
            </a>
          </div>
        </form>
      </Form>
    </div>
  )
}
