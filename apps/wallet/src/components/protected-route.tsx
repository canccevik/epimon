import { useWallet } from '@/hooks/use-wallet'
import { PASSWORD, SECRET_PHRASE } from '@/lib/constants'
import { getItem } from '@/lib/utils/storage'
import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate()
  const { wallet } = useWallet()
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
