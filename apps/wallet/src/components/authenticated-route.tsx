import { WalletContext } from '@/context/wallet-context'
import { PASSWORD, SECRET_PHRASE } from '@/lib/constants'
import { getItem } from '@/lib/utils/storage'
import { Loader } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function AuthenticatedRoute({ children }: Props) {
  const navigate = useNavigate()
  const { wallet } = useContext(WalletContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const ensureAuthenticated = async () => {
      const password = await getItem(PASSWORD)
      const secretPhrase = await getItem(SECRET_PHRASE)

      if (!password || !secretPhrase || !wallet) {
        navigate('/auth')
      }
      if (password && secretPhrase && !wallet) {
        navigate('/auth/unlock')
      }
    }

    ensureAuthenticated()
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <Loader className="animate-spin" />
  }
  return children
}
