import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'
import { Deck } from '@/components_next/deck/Deck'

import { api } from '@/lib/api'
import { PlayAreaProvider } from '@/app/room/[room]/_components/play-area-provider'
import { Results } from '@/app/room/[room]/_components/results'
import { Users } from '@/app/room/[room]/_components/users'

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
        <PlayAreaProvider user={user} room={room} deck={deck.data}>
          <div className="flex flex-col gap-4 lg:max-w-xs">
            <div className="flex items-center justify-between">
              <h1>room: {room.name || room.code}</h1>
            </div>

            <Users user={user} />
            <Results user={user} />
          </div>

          <Deck />
        </PlayAreaProvider>
      </main>
    </>
  )
}
