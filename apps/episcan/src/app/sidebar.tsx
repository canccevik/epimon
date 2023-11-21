import { Switch } from '@/components/ui/switch'
import { sidebarNavItems } from '@/config/sidebar'
import { Moon } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="w-2/12 h-screen bg-white flex flex-col items-center justify-between fixed top-0 left-0 py-10 text-main-black">
      <div>
        <a className="text-3xl font-medium tracking-wider">Episcan</a>
      </div>

      <div className="w-full flex flex-col gap-y-5 px-8">
        {sidebarNavItems.map((item, i) => (
          <Link
            className="w-full flex items-center hover:bg-main-black hover:text-white duration-200 hover:duration-200 p-6 gap-x-5 rounded-lg"
            href={item.path}
            key={i}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <div></div>

      <div className="flex gap-x-5">
        <Moon className="text-main-black" />
        <Switch />
      </div>
    </div>
  )
}
