'use server'

import { CreateRoomFormValues } from '@/app/(app)/_components/create-room-form'
import { JoinRoomFormValues } from '@/app/(app)/_components/join-room-form'

export const createRoomAction = async (data: CreateRoomFormValues) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('createRoomAction')
}
