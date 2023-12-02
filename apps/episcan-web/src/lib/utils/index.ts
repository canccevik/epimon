import { type ClassValue, clsx } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const ROOT_NODE_URI = process.env.NEXT_PUBLIC_EPISCAN_API_URI

export const fetcher = async (url: string) => {
  const response = await fetch(ROOT_NODE_URI + url)
  const data = await response.json()

  if (!response.ok) {
    throw data
  }
  return data
}

export const shortenString = (text: string, lastPartLength: number = 8) =>
  text.length >= 20
    ? text.slice(0, 5) + '...' + text.slice(text.length - lastPartLength, text.length)
    : text

export const getRelativeTimeFromTimestamp = (timestamp: number) => moment(timestamp).fromNow()
