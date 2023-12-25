import { createHashRouter } from 'react-router-dom'
import AppLayout from './pages/layout'
import CreatePassword from './pages/auth/create-wallet/create-password'
import ImportCreatePassword from './pages/auth/import-wallet/create-password'
import SecureWallet from './pages/auth/create-wallet/secure-wallet'
import CreateConfirmSecret from './pages/auth/create-wallet/confirm-secret'
import AuthLayout from './pages/auth/layout'
import Auth from './pages/auth'
import Home from './pages/home'
import ImportConfirmSecret from './pages/auth/import-wallet/confirm-secret'
import Unlock from './pages/auth/unlock'
import CreateTransaction from './pages/create-transaction'

export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/create-transaction',
        element: <CreateTransaction />
      },
      {
        element: <AuthLayout />,

        children: [
          {
            path: '/auth',
            element: <Auth />
          },
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
          },
          {
            path: '/auth/import/create-password',
            element: <ImportCreatePassword />
          },
          {
            path: '/auth/unlock',
            element: <Unlock />
          }
        ]
      }
    ]
  }
])
