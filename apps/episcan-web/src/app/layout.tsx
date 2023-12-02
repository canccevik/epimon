import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import '@/styles/globals.css'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Providers from './providers'

const prompt = Prompt({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  }
}

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(prompt.className, 'bg-gray-50 dark:bg-zinc-900')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
