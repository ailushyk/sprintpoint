import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'
import { Deck } from '@/components_next/deck/Deck'

import { Separator } from '@easypoker/ui'

import { api } from '@/lib/api'
import { OnlineProvider } from '@/app/room/[room]/_components/online-provider'
import { Results } from '@/app/room/[room]/_components/results'
import { RoomTitle } from '@/app/room/[room]/_components/room-title'
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

      <main className="container flex-1 pb-24">
        <OnlineProvider user={user} room={room} deck={deck.data}>
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex flex-col gap-8 lg:w-52">
              <div className="flex items-center justify-between text-muted-foreground">
                <RoomTitle room={room} />
              </div>

              <Users user={user} />
              <Results user={user} />
            </div>

            <Separator
              orientation="vertical"
              className="hidden h-auto lg:block"
            />
            <Deck />
          </div>
        </OnlineProvider>
      </main>
    </>
  )
}
