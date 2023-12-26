import { WalletContext } from '@/context/wallet-context'
import { useContext } from 'react'

export function useWallet() {
  const { wallet, setWallet } = useContext(WalletContext)

  return { wallet, setWallet }
}
