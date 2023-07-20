'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const GlobalKeyboardEvents = () => {
  const navigate = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // if (e.key === 'j' && e.metaKey) {
      //   setOpen((open) => !open)
      // }
      if (e.key === 'p' && e.metaKey && e.shiftKey) {
        navigate.push('/profile')
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return null
}
