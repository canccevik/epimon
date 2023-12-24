import { useNavigate } from 'react-router-dom'
import { useStorage } from './use-storage'

export function useAuth() {
  const navigate = useNavigate()
  const { clearItems } = useStorage()

  async function logout() {
    await clearItems()
    navigate('/auth')
  }

  return { logout }
}
