import Sidebar from '../../components/sidebar'
import Footer from '../../components/footer'
import { Toaster } from '@/components/ui/toaster'

interface LayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div>
      <Toaster />
      <Sidebar />

      <div className="w-10/12 ml-auto p-10">
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  )
}
