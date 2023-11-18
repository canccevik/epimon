import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import '../styles/globals.css'
import { siteConfig } from '@/config/site'
import Sidebar from '@/components/sidebar'
import { cn } from '@/lib/utils'

const prompt = Prompt({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(prompt.className, 'bg-gray-50')}>
        <Sidebar />
        <div>{children}</div>
      </body>
    </html>
  )
}
