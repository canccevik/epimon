'use client'

import { Switch } from '@/components/ui/switch'
import { sidebarNavItems } from '@/config/sidebar'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function Sidebar() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="w-2/12 h-screen bg-white text-main-black dark:bg-dark-gray dark:text-white flex flex-col items-center justify-between fixed top-0 left-0 py-10">
      <div>
        <Link href="/" className="text-3xl font-semibold tracking-wider">
          EPISCAN
        </Link>
      </div>

      <div className="w-full flex flex-col gap-y-5 px-8">
        {sidebarNavItems.map((item, i) => (
          <Link
            className="w-full flex items-center hover:bg-main-black hover:text-white dark:hover:bg-white dark:hover:text-black duration-200 hover:duration-200 p-6 gap-x-5 rounded-lg"
            href={item.path}
            key={i}
          >
            {item.icon}
            <span className="mt-2">{item.title}</span>
          </Link>
        ))}
      </div>

      <div></div>

      <div className="flex gap-x-5 text-black dark:text-white">
        {theme === 'light' ? <Sun /> : <Moon />}
        <Switch onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      </div>
    </div>
  )
}
