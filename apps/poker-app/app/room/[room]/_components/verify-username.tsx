'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { UserProfileValues } from '@/lib/user/user'

export const VerifyUsername = ({ user }: { user: UserProfileValues }) => {
  const router = useRouter()

  useEffect(() => {
    if (
      !user.username ||
      (user.type === 'incognito' && user.username === '@guest')
    ) {
      router.push(`/profile`)
    }
  }, [])

  return null
}
