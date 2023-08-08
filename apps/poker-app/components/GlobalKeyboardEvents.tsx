'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const GlobalKeyboardEvents = () => {
  const navigate = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // if (e.key === 'd' && e.metaKey && e.shiftKey) {
      //   e.preventDefault()
      //   navigate.push('/dashboard')
      // }

      if (e.key === 'p' && e.metaKey && e.shiftKey) {
        navigate.push('/profile')
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [navigate])

  return null
}
