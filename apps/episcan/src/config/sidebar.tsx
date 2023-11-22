import { NavbarItem } from '@/types'
import { Boxes, FileText, Home, User2 } from 'lucide-react'

export const sidebarNavItems: NavbarItem[] = [
  { path: '/', title: 'Home', icon: <Home /> },
  { path: '/transactions', title: 'Transactions', icon: <FileText /> },
  { path: '/blocks', title: 'Blocks', icon: <Boxes /> },
  { path: '/miners', title: 'Miners', icon: <User2 /> }
]
