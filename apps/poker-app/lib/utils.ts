import crypto from 'crypto'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function generateUniqueHash() {
  const timestamp = Date.now().toString()
  return crypto.createHash('SHA256').update(timestamp).digest('hex').slice(0, 8)
}

export function getInitials(name: string | undefined) {
  if (!name) return

  const nameSplit = name.split(' ')
  const firstInitial = nameSplit[0].charAt(0).toUpperCase()

  if (nameSplit.length >= 2) {
    const lastInitial = nameSplit[nameSplit.length - 1].charAt(0).toUpperCase()
    return firstInitial + lastInitial
  } else {
    return firstInitial
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
