import { Wallet } from '@epimon/common'
import { createContext, useState } from 'react'

export interface AuthContextType {
  readonly wallet: Wallet | null
  readonly setWallet: (wallet: Wallet) => void
}

export const AuthContext = createContext<AuthContextType>({
  wallet: null,
  setWallet: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null)

  return <AuthContext.Provider value={{ wallet, setWallet }}>{children}</AuthContext.Provider>
}
