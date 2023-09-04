'use server'

import { JoinRoomFormValues } from '@/app/(app)/_components/join-room-form'
import { RoomFormValues } from '@/app/(app)/_components/room-form'

export const saveRoomAction = async (data: RoomFormValues) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('createRoomAction')
}
