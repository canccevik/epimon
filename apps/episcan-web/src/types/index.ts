import React from 'react'

export type SiteConfig = {
  name: string
}

export type NavbarItem = {
  title: string
  path: string
  icon?: React.ReactNode
}

export type AppConfig = {
  coinName: string
}
