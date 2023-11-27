import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const ROOT_NODE_URI = process.env.NEXT_PUBLIC_ROOT_NODE_URI

export const fetcher = (endpoint: string) =>
  fetch(ROOT_NODE_URI + endpoint).then((res) => res.json())

export const shortenString = (text: string) =>
  text.length >= 20 ? text.slice(0, 5) + '...' + text.slice(text.length - 8, text.length) : text
