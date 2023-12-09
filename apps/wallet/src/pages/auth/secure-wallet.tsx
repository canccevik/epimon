import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn, copyToClipboard } from '@/lib/utils'
import { Check, Copy, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function SecureWallet() {
  const [isCopied, setIsCopied] = useState(false)
  const [isSecretVisible, setIsSecretVisible] = useState(true)

  function copySecretPhrase() {
    copyToClipboard('Word')
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  function toggleSecretVisibility() {
    setIsSecretVisible(!isSecretVisible)
  }

  return (
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-3xl font-normal text-center">Write down your Secret Recovery Phrase</h1>
      <p className="text-center">
        Write down this 12-word Secret Recovery Phrase and save it in a place that you trust and
        only you can access.
      </p>

      <Card className={cn('w-full p-5 select-none', !isSecretVisible && 'blur-sm')}>
        <div className="grid grid-cols-4 gap-3 text-center">
          <Card className="p-3 rounded-sm">
            <span className="font-light text-sm">1. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">2. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">3. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">4. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">5. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">6. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">7. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">8. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">9. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">10. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">11. Word</span>
          </Card>

          <Card className=" p-3 rounded-sm">
            <span className="font-light text-sm">12. Word</span>
          </Card>
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

      <a href="/confirm-secret" className={cn('w-full', buttonVariants())}>
        Next
      </a>
    </div>
  )
}
