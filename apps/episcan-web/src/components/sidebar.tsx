'use client'

import { Switch } from '@/components/ui/switch'
import { sidebarNavItems } from '@/config/sidebar'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Button } from './ui/button'
import { useState } from 'react'
import Image from 'next/image'

export default function Sidebar() {
  const { theme, setTheme } = useTheme()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  return (
    <div className="w-full">
      <div className="sm:hidden w-full py-6 z-50 fixed top-0 left-0 px-5 bg-white dark:bg-dark-gray">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3">
            <Image src={'/icon.ico'} width={25} height={25} alt="Episcan logo" />

            <Link href="/" className="text-3xl font-semibold tracking-wider">
              Episcan
            </Link>
          </div>

          <Button
            className="bg-gray-100 focus:bg-gray-100 text-black"
            size={'sm'}
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          >
            <Menu size={20} />
          </Button>
        </div>

        {isMenuVisible && (
          <div className="w-full animate-accordion-down duration-500 border-t-2 border-gray-100 dark:border-none top-0 left-0 z-40 mt-8">
            {sidebarNavItems.map((item, i) => (
              <Link
                className="w-full border-b-2 border-gray-100 dark:border-zinc-900 flex items-center justify-center lg:justify-normal hover:bg-main-black hover:text-white dark:hover:bg-white dark:hover:text-black duration-200 hover:duration-200 p-6 gap-x-5"
                href={item.path}
                key={i}
                onClick={() => setIsMenuVisible(false)}
              >
                <span>{item.icon}</span>
                <span className="mt-2">{item.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="hidden sm:flex w-2/12 h-screen overflow-x-hidden bg-white text-main-black dark:bg-dark-gray dark:text-white flex-col items-center justify-between fixed top-0 left-0 py-10">
        <div>
          <Link href="/" className="text-3xl lg:hidden font-semibold tracking-wider">
            ES
          </Link>

          <div className="lg:flex gap-x-3 hidden">
            <Image src={'/icon.ico'} width={30} height={30} alt="Episcan logo" />

            <Link href="/" className="text-3xl font-semibold tracking-wider">
              Episcan
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-5 px-4 lg:px-8">
          {sidebarNavItems.map((item, i) => (
            <Link
              className="w-full flex items-center justify-center lg:justify-normal hover:bg-main-black hover:text-white dark:hover:bg-white dark:hover:text-black duration-200 hover:duration-200 p-6 gap-x-5 rounded-lg"
              href={item.path}
              key={i}
            >
              <span className="lg:text-6xl">{item.icon}</span>
              <span className="mt-2 hidden lg:block">{item.title}</span>
            </Link>
          ))}
        </div>

        <div></div>

        <div className="flex flex-col items-center gap-y-5 lg:justify-normal lg:flex-row gap-x-5 text-black dark:text-white">
          {theme === 'light' ? <Sun /> : <Moon />}
          <Switch onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        </div>
      </div>
    </div>
  )
}
