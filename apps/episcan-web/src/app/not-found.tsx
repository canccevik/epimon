import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center flex flex-col gap-y-2 -mt-16">
        <h1 className="text-[180px] font-semibold tracking-wider">404</h1>

        <div className="mb-5 -mt-10">
          <h2 className="text-3xl font-medium">Page Not Found</h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
            The page that you are looking for does not exist.
          </p>
        </div>

        <Link
          href="/"
          className={cn(buttonVariants(), 'box-content p-2 flex items-center font-medium')}
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
