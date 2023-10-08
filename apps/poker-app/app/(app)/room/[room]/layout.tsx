import React from 'react'

import { api } from '@/lib/api'
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
  const [user, room] = await Promise.all([
    api().user.get(),
    api().room.get(params.room),
  ])
  const deck = await api().deck.getAdvanced('standard')

  return (
    <OnlineProvider user={user} room={room} deck={deck.data}>
      <RoomHeader room={room} />
      {children}
    </OnlineProvider>
  )
}
