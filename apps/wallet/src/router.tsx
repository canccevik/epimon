import { createHashRouter } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import CreatePassword from './pages/auth/create-wallet/create-password'
import ImportCreatePassword from './pages/auth/import-wallet/create-password'
import SecureWallet from './pages/auth/create-wallet/secure-wallet'
import CreateConfirmSecret from './pages/auth/create-wallet/confirm-secret'
import AuthLayout from './layouts/auth-layout'
import Auth from './pages/auth'
import Home from './pages/home'
import ImportConfirmSecret from './pages/auth/import-wallet/confirm-secret'
import Unlock from './pages/auth/unlock'
import CreateTransaction from './pages/create-transaction'
import AuthenticatedRoute from './components/authenticated-route'

export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <AuthenticatedRoute children={<Home />} />
      },
      {
        path: '/create-transaction',
        element: <AuthenticatedRoute children={<CreateTransaction />} />
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
