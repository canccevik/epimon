import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './pages/layout'
import CreatePassword from './pages/auth/create-wallet/create-password'
import SecureWallet from './pages/auth/create-wallet/secure-wallet'
import CreateConfirmSecret from './pages/auth/create-wallet/confirm-secret'
import AuthLayout from './pages/auth/layout'
import Auth from './pages/auth'
import Home from './pages/home'
import ImportConfirmSecret from './pages/auth/import-wallet/confirm-secret'

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
            path: '/auth/create/create-password',
            element: <CreatePassword />
          },
          {
            path: '/auth/create/secure-wallet',
            element: <SecureWallet />
          },
          {
            path: '/auth/create/confirm-secret',
            element: <CreateConfirmSecret />
          },
          {
            path: '/auth/import/confirm-secret',
            element: <ImportConfirmSecret />
          }
        ]
      }
    ]
  }
])
