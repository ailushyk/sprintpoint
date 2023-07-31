import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'

import { api } from '@/lib/api'
import { Board } from '@/app/room/[room]/_components/board'
import { OnlineProvider } from '@/app/room/[room]/_components/online-provider'

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
        <OnlineProvider user={user} room={room} deck={deck.data}>
          <Board />
        </OnlineProvider>
      </main>
    </>
  )
}
