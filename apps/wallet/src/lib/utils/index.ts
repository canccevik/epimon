import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

export function getRandomWordsFromText(text: string, wordCount: number) {
  const splittedText = text.split(' ')
  const usedIndexes: number[] = []

  return Array.from({ length: wordCount }).map(() => {
    const createIndex = () => Math.floor(Math.random() * splittedText.length)
    let randomIndex = createIndex()

    while (usedIndexes.includes(randomIndex)) {
      randomIndex = createIndex()
    }
    usedIndexes.push(randomIndex)
    return splittedText[randomIndex]
  })
}
