'use server'

import { RoomFormValues } from '@/app/(app)/_components/room-form'

// TODO: remove this
export const saveRoomAction = async (data: RoomFormValues) => {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('createRoomAction')
}
