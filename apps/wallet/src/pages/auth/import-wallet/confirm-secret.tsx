import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { importSecretPhraseSchema } from '@/lib/schemas/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import * as bip39 from 'bip39'
import { useContext, useEffect, useState } from 'react'
import { createWalletFromSecretPhrase } from '@/lib/utils/wallet'
import { WalletContext } from '@/context/wallet-context'

type FormData = z.infer<typeof importSecretPhraseSchema>

export default function ConfirmSecret() {
  const navigate = useNavigate()
  const { setWallet } = useContext(WalletContext)
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true)

  const form = useForm<FormData>({
    defaultValues: {
      secretPhraseWords: new Array(12)
    }
  })

  function onPasteToInput(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const data = e.clipboardData.getData('Text').split(' ')
    form.setValue('secretPhraseWords', data)
  }

  async function onSubmit({ secretPhraseWords }: FormData) {
    const secretPhrase = secretPhraseWords.join(' ').trim()
    const wallet = createWalletFromSecretPhrase(secretPhrase)

    setWallet(wallet)
    navigate('/auth/import/create-password')
  }

  useEffect(() => {
    form.watch(({ secretPhraseWords }) => {
      const secretPhrase = secretPhraseWords!.join(' ').trim()

      if (!bip39.validateMnemonic(secretPhrase)) {
        return form.setError('root', { message: 'Secret phrase is not valid.' })
      }
      form.clearErrors('root')
      setIsConfirmButtonDisabled(false)
    })
  }, [form])

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">
        Access your wallet with your Secret Recovery Phrase
      </h1>
      <p className="text-center text-sm">
        Enter the Secret Recovery Phrase that you were given when you created your wallet.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
          <Card className="w-full p-5 select-none">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center text-sm">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="p-3 rounded-sm flex items-center gap-x-2 shadow-none">
                  <span className="text-gray-600">{i + 1}.</span>
                  <Input
                    className="font-light text-center p-0"
                    onPaste={(e) => onPasteToInput(e)}
                    {...form.register(`secretPhraseWords.${i}`)}
                  />
                </Card>
              ))}
            </div>
          </Card>

          {form.formState.errors.root && (
            <Alert variant={'destructive'}>
              <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-y-5">
            <Button type="submit" className="w-full" disabled={isConfirmButtonDisabled}>
              Confirm Secret Recovery Phrase
            </Button>

            <Button className="w-full" variant={'outline'} onClick={() => navigate('/auth')}>
              Go back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
