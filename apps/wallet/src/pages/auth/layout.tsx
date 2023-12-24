import { AuthProvider } from '@/context/auth-context'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <AuthProvider>
      <div className="w-full flex flex-col justify-center items-center">
        <img src="/images/icon.ico" width={75} className="mb-5" />

        <Outlet />
      </div>
    </AuthProvider>
  )
}
