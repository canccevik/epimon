import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-4/12 px-20 py-10 flex flex-col items-center gap-y-5">
        <img src="../../public/images/icon.ico" width={100} />

        <h1 className="text-3xl font-normal">Epimon Wallet</h1>
        <p className="text-center">
          A lightweight cryptocurrency wallet, ensuring security and accessibility for all users.
        </p>

        <a href="/create-wallet" className={cn('w-[350px] mt-5', buttonVariants())}>
          Create a new wallet
        </a>
        <a
          href="/import-wallet"
          className={cn('w-[350px]', buttonVariants({ variant: 'outline' }))}
        >
          Import an existing wallet
        </a>
      </Card>
    </div>
  )
}
