import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import AppLayout from './pages/layout'
import CreatePassword from './pages/auth/create-wallet/create-password'
import SecureWallet from './pages/auth/create-wallet/secure-wallet'
import ConfirmSecret from './pages/auth/create-wallet/confirm-secret'
import AuthLayout from './pages/auth/layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/create-password',
            element: <CreatePassword />
          },
          {
            path: '/secure-wallet',
            element: <SecureWallet />
          },
          {
            path: '/confirm-secret',
            element: <ConfirmSecret />
          }
        ]
      }
    ]
  }
])
