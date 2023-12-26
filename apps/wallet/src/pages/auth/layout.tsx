import { AuthProvider } from '@/context/auth-context'
import { useWallet } from '@/hooks/use-wallet'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
  const navigate = useNavigate()
  const { wallet } = useWallet()

  useEffect(() => {
    if (wallet) {
      navigate('/')
    }
  }, [])

  return (
    <AuthProvider>
      <div className="w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </AuthProvider>
  )
}
