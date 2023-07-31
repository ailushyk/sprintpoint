import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'

import { api } from '@/lib/api'
import { PlayAreaProvider } from '@/app/room/[room]/_components/play-area-provider'

export default async function PlayRoomPage({
  params,
}: {
  params: { room: string }
}) {
  const [user, room] = await Promise.all([
    api().user.get(),
    api().room.get(params.room),
  ])
  const deck = await api().deck.getAdvanced(room.deck)

  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <PlayAreaProvider user={user} room={room} deck={deck.data} />
      </main>
    </>
  )
}
