import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import CreateWallet from './pages/auth/create-wallet'
import AppLayout from './pages/layout'

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
        path: '/create-wallet',
        element: <CreateWallet />
      }
    ]
  }
])
