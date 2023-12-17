import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './pages/layout'
import CreatePassword from './pages/auth/create-wallet/create-password'
import SecureWallet from './pages/auth/create-wallet/secure-wallet'
import ConfirmSecret from './pages/auth/create-wallet/confirm-secret'
import AuthLayout from './pages/auth/layout'
import Auth from './pages/auth'
import Home from './pages/home'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/create-password',
            element: <CreatePassword />
          },
          {
            path: '/auth/secure-wallet',
            element: <SecureWallet />
          },
          {
            path: '/auth/confirm-secret',
            element: <ConfirmSecret />
          }
        ]
      }
    ]
  }
])
