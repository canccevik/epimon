import { Wallet } from '@epimon/common'
import { createContext, useState } from 'react'

export interface WalletContextType {
  readonly wallet: Wallet | null
  readonly setWallet: (wallet: Wallet | null) => void
}

export const WalletContext = createContext<WalletContextType>({
  wallet: null,
  setWallet: () => {}
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null)

  return <WalletContext.Provider value={{ wallet, setWallet }}>{children}</WalletContext.Provider>
}
