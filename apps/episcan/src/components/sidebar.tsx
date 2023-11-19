import { sidebarNavItems } from '@/config/sidebar'
import { Boxes, FileText, Home, User2 } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="w-[230px] h-screen bg-white flex flex-col items-center justify-between px-5 py-10 text-[#182122]">
      <div>
        <a className="text-3xl font-medium">Episcan</a>
      </div>

      <div className="flex flex-col gap-y-5">
        {sidebarNavItems.map((item, i) => (
          <Link
            className="w-full flex items-center p-5 gap-x-5 rounded-lg"
            href={item.path}
            key={i}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <div></div>

      <div></div>
    </div>
  )
}
