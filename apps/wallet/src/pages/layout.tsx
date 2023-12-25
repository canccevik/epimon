import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  function openOnNewTab() {
    chrome.tabs.create({ url: chrome.runtime.getURL('/') })
  }

  return (
    <div className="w-[450px] md:w-full h-max md:h-screen my-5 md:my-0 flex justify-center items-center">
      <Card className="w-full md:w-4/12 border-none md:border md:border-solid px-10 md:px-20 py-5 flex flex-col items-center relative">
        <div className="w-full flex justify-center">
          <img src="/images/icon.ico" width={60} className="mb-5" />

          <ExternalLink
            className="absolute right-5 cursor-pointer text-gray-500"
            size={20}
            onClick={() => openOnNewTab()}
          />
        </div>

        <Outlet />
      </Card>
    </div>
  )
}
