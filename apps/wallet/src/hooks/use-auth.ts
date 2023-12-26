import { useNavigate } from 'react-router-dom'
import { useStorage } from './use-storage'
import { PASSWORD, SECRET_PHRASE } from '@/lib/constants'
import { encryptWithPassword } from '@/lib/utils/crypto'
import { useWallet } from './use-wallet'

export function useAuth() {
  const navigate = useNavigate()
  const { wallet } = useWallet()
  const { setItem, clearItems } = useStorage()

  const logout = async () => {
    await clearItems()
    navigate('/auth')
  }

  const login = async (password: string) => {
    await setItem(PASSWORD, password)
    await setItem(SECRET_PHRASE, encryptWithPassword(wallet!.secretPhrase, password))
    navigate('/')
  }

  return { logout, login }
}
