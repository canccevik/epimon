import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  function openOnNewTab() {
    chrome.tabs.create({ url: chrome.runtime.getURL('/') })
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-4/12 px-20 py-5 flex flex-col items-center relative">
        <ExternalLink
          className="absolute right-5 cursor-pointer text-gray-500"
          size={20}
          onClick={() => openOnNewTab()}
        />

        <Outlet />
      </Card>
    </div>
  )
}
