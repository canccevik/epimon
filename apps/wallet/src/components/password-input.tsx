import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input, InputProps } from './ui/input'

interface PasswordInputProps extends InputProps {}

export default function PasswordInput({ ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  function toggleVisibility() {
    setIsVisible(!isVisible)
  }

  return (
    <div className="relative flex items-center">
      <Input
        type={isVisible ? 'text' : 'password'}
        placeholder="Password"
        className="pr-16"
        {...props}
      />

      {isVisible ? (
        <EyeOff
          className="absolute right-6 cursor-pointer text-zinc-400 hover:text-zinc-600"
          size={22}
          onClick={() => toggleVisibility()}
        />
      ) : (
        <Eye
          className="absolute right-6 cursor-pointer text-zinc-400 hover:text-zinc-600"
          size={22}
          onClick={() => toggleVisibility()}
        />
      )}
    </div>
  )
}
