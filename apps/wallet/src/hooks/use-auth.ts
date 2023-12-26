import { useNavigate } from 'react-router-dom'
import { PASSWORD, SECRET_PHRASE } from '@/lib/constants'
import { decryptWithPassword, encryptWithPassword, hashPassword } from '@/lib/utils/crypto'
import { useWallet } from './use-wallet'
import { toast } from './use-toast'
import { createWalletFromSecretPhrase } from '@/lib/utils/wallet'
import { clearItems, getItem, setItem } from '@/lib/utils/storage'

export function useAuth() {
  const navigate = useNavigate()
  const { wallet, setWallet } = useWallet()

  const logout = async () => {
    setWallet(null)
    await clearItems()
    navigate('/auth')
  }

  const login = async (password: string) => {
    const hashedPassword = hashPassword(password)

    await setItem(PASSWORD, hashedPassword)
    await setItem(SECRET_PHRASE, encryptWithPassword(wallet!.secretPhrase, hashedPassword))
    navigate('/')
  }

  const unlock = async (password: string) => {
    const hashedPassword = hashPassword(password)
    const correctPassword = await getItem(PASSWORD)

    if (hashedPassword !== correctPassword) {
      return toast({ description: 'Wrong password!', variant: 'destructive' })
    }

    const encryptedSecretPhrase = await getItem(SECRET_PHRASE)
    const secretPhrase = decryptWithPassword(encryptedSecretPhrase, hashedPassword)
    const createdWallet = createWalletFromSecretPhrase(secretPhrase)

    setWallet(createdWallet)
    navigate('/')
  }

  return { logout, login, unlock }
}
