import { AuthProvider } from '@/context/auth-context'
import { WalletContext } from '@/context/wallet-context'
import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
  const navigate = useNavigate()
  const { wallet } = useContext(WalletContext)

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
