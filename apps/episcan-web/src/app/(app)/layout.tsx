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

      <div className="w-full sm:w-10/12 ml-auto p-5 sm:p-10 max-sm:mt-24">
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  )
}
