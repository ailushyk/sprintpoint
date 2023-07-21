'use server'

import { cookies } from 'next/headers'

import { generateUniqueHash } from '@/lib/utils'

export const createRoom = async () => {
  return generateUniqueHash()
}

// get username from cookie
export const getUsername = async () => {
  return cookies().get('user')
}

// save username to cookie
export const saveUsername = async (name: string) => {
  cookies().set({
    name: 'user',
    value: name,
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
  })
}
