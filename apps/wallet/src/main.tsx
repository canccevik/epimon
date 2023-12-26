import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/globals.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Toaster } from './components/ui/toaster'
import { WalletProvider } from './context/wallet-context'

const root = document.getElementById('root')

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <WalletProvider>
      <Toaster />
      <RouterProvider router={router} />
    </WalletProvider>
  </React.StrictMode>
)
