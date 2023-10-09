import React from 'react'

import { api } from '@/lib/api/api'
import { RoomHeader } from '@/components/app-header/room-header'
import { OnlineProvider } from '@/app/(app)/room/[room]/_components/online-provider'
import { PlayRoomPageProps } from '@/app/(app)/room/[room]/page'

export const dynamic = 'force-dynamic'

interface RoomLayoutProps extends PlayRoomPageProps {
  children: React.ReactNode
}

export default async function RoomLayout({
  children,
  params,
}: RoomLayoutProps) {
  const user = await api().user.get()
  const lastSession = await api().room.session.getByRoom(params.room)

  return (
    <OnlineProvider user={user} room={lastSession.room} deck={lastSession.deck}>
      <RoomHeader room={lastSession.room} />
      {children}
    </OnlineProvider>
  )
}
