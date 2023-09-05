import React from 'react'

import { api } from '@/lib/api'
import { RoomHeader } from '@/components/app-header/room-header'
import { PlayRoomPageProps } from '@/app/(app)/room/[room]/page'

interface RoomLayoutProps extends PlayRoomPageProps {
  children: React.ReactNode
}

export default function RoomLayout({ children, params }: RoomLayoutProps) {
  const room = api().room.get(params.room)

  return (
    <>
      <RoomHeader room={room} />
      {children}
    </>
  )
}
