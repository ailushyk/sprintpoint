'use server'

import { cookies } from 'next/headers'

import { toast } from '@easypoker/ui'

import { generateUniqueHash } from '@/lib/utils'
import { UsernameFormValues } from '@/app/room/[room]/_components/set-username-form'

export const createRoom = async () => {
  return generateUniqueHash()
}

// get username from cookie
export const getUsername = async () => {
  return cookies().get('username')
}

// save username to cookie
export const saveUsername = async ({ username }: UsernameFormValues) => {
  try {
    cookies().set({
      name: 'username',
      value: username,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
    })

    toast({
      title: 'Username saved!',
      description: 'You can change it anytime in the settings.',
    })
  } catch (error) {
    console.error(error)
    toast({
      title: 'Ups!',
      description: 'Something went wrong. Please try again later.',
    })
  }
}
