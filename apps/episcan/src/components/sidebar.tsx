import { Boxes, FileText, Home, User2 } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="w-[230px] h-screen bg-white flex flex-col items-center justify-between px-5 py-10 text-[#182122]">
      <div>
        <a className="text-3xl font-medium">Episcan</a>
      </div>

      <div className="flex flex-col gap-y-5">
        <Link className="w-full flex items-center p-5 gap-x-5 rounded-lg" href="/">
          <Home />
          <span>Home</span>
        </Link>

        <Link className="w-full flex items-center p-5 gap-x-5 rounded-lg" href="/">
          <FileText />
          <span>Transactions</span>
        </Link>

        <Link className="w-full flex items-center p-5 gap-x-5 rounded-lg" href="/">
          <Boxes />
          <span>Blocks</span>
        </Link>

        <Link className="w-full flex items-center p-5 gap-x-5 rounded-lg" href="/">
          <User2 />
          <span>Validators</span>
        </Link>
      </div>

      <div></div>

      <div></div>
    </div>
  )
}
