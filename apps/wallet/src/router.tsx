import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import AppLayout from './pages/layout'
import CreatePassword from './pages/auth/create-password'

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
        path: '/create-password',
        element: <CreatePassword />
      }
    ]
  }
])
