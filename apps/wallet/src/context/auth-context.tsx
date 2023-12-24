import { Wallet } from '@epimon/common'
import { createContext, useState } from 'react'

export interface AuthContextType {
  readonly wallet: Wallet | null
  readonly setWallet: (wallet: Wallet) => void
  readonly setPassword: (password: string) => void
  readonly password: string
}

export const AuthContext = createContext<AuthContextType>({
  password: '',
  wallet: null,
  setWallet: () => {},
  setPassword: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [password, setPassword] = useState<string>('')

  return (
    <AuthContext.Provider value={{ wallet, setWallet, password, setPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
