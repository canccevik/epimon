import { sidebarNavItems } from '@/config/sidebar'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="w-2/12 h-screen bg-white flex flex-col items-center justify-between fixed top-0 left-0 py-10 text-[#182122]">
      <div>
        <a className="text-3xl font-medium tracking-wider">Episcan</a>
      </div>

      <div className="w-full flex flex-col gap-y-5 px-8">
        {sidebarNavItems.map((item, i) => (
          <Link
            className="w-full flex items-center p-6 gap-x-5 rounded-lg"
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
