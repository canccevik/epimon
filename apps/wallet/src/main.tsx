import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home'
import '@/styles/globals.css'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

const root = document.getElementById('root')

const router = createMemoryRouter([
  {
    path: '/',
    element: <Home />
  }
])

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
