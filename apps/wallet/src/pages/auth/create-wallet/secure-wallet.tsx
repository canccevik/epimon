import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/auth-context'
import { cn, copyToClipboard } from '@/lib/utils'
import { Check, Copy, Eye, EyeOff } from 'lucide-react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SecureWallet() {
  const navigate = useNavigate()
  const { wallet } = useContext(AuthContext)
  const [isCopied, setIsCopied] = useState(false)
  const [isSecretVisible, setIsSecretVisible] = useState(true)

  function copySecretPhrase() {
    copyToClipboard(wallet!.secretPhrase)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)
  }

  function toggleSecretVisibility() {
    setIsSecretVisible(!isSecretVisible)
  }

  return (
    wallet && (
      <div className="flex flex-col items-center gap-y-5">
        <h1 className="text-3xl font-normal text-center">Write down your Secret Recovery Phrase</h1>

        <Card className={cn('w-full p-5 select-none', !isSecretVisible && 'blur-sm')}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center text-sm">
            {wallet.secretPhrase.split(' ').map((word, i) => (
              <Card key={i} className="p-3 rounded-sm flex items-center gap-x-2 shadow-none">
                <span className="text-gray-600">{i + 1}.</span>
                <Input
                  className="font-light text-center p-0 disabled:text-black"
                  value={word}
                  disabled
                />
              </Card>
            ))}
          </div>
        </Card>

        <div className="w-full flex justify-between my-2">
          <a
            className="flex items-center gap-x-2 text-sm cursor-pointer"
            onClick={() => toggleSecretVisibility()}
          >
            {isSecretVisible ? (
              <>
                <EyeOff size={20} />
                Hide secret phrase
              </>
            ) : (
              <>
                <Eye size={20} />
                Reveal secret phrase
              </>
            )}
          </a>

          <a
            className="flex items-center gap-x-2 text-sm cursor-pointer"
            onClick={() => copySecretPhrase()}
          >
            {isCopied ? (
              <>
                <Check size={20} />
                Copied
              </>
            ) : (
              <>
                <Copy size={20} />
                Copy to clipboard
              </>
            )}
          </a>
        </div>

        <Button className={'w-full'} onClick={() => navigate('/auth/create/confirm-secret')}>
          Next
        </Button>
      </div>
    )
  )
}
