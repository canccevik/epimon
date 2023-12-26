import { createContext, useState } from 'react'

export interface AuthContextType {
  readonly setPassword: (password: string) => void
  readonly password: string
}

export const AuthContext = createContext<AuthContextType>({
  password: '',
  setPassword: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState<string>('')

  return <AuthContext.Provider value={{ password, setPassword }}>{children}</AuthContext.Provider>
}
