import { Card } from '@/components/ui/card'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-4/12 px-20 py-5 flex flex-col items-center">
        <img src="/images/icon.ico" width={75} className="mb-5" />

        <Outlet />
      </Card>
    </div>
  )
}
