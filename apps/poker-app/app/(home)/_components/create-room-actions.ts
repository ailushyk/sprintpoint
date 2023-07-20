'use server'

import { CreateRoomFormValues } from '@/app/(home)/_components/create-room-form'

export const createRoomAction = async (data: CreateRoomFormValues) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log('createRoomAction')
}
