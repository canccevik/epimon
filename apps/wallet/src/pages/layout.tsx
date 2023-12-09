import { Card } from '@/components/ui/card'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-4/12 px-20 py-10 flex flex-col items-center">
        <img src="../../public/images/icon.ico" width={100} className="mb-5" />

        <Outlet />
      </Card>
    </div>
  )
}
