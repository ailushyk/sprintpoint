import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'
import { Deck } from '@/components_next/deck/Deck'
import { DeckValue } from '@/components_next/deck/deck.api'
import { Loading } from '@/components_next/Loading'
import { WaitOnPromise } from '@/components_next/wait-on-promise'

import { api } from '@/lib/api'
import { PlayArea } from '@/app/room/[room]/_components/play-area'

export default async function PlayRoomPage({
  params,
}: {
  params: { room: string }
}) {
  const [user, room] = await Promise.all([
    api().user.get(),
    api().room.get(params.room),
  ])
  const deckPromise = api().deck.getAdvanced(room.deck)

  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <PlayArea user={user} room={room}>
          <WaitOnPromise promise={deckPromise} fallback={<Loading />}>
            {({ data }: { data: DeckValue }) => <Deck deck={data} />}
          </WaitOnPromise>
        </PlayArea>
      </main>
    </>
  )
}
