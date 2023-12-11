import { AuthProvider } from '@/context/auth-context'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
