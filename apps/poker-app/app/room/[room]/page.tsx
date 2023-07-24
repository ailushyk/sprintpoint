import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'
import { Deck } from '@/components_next/deck/Deck'

import { api } from '@/lib/api'
import { PlayArea } from '@/app/room/[room]/_components/play-area'

export const revalidate = 0

export default function PlayRoomPage({ params }: { params: { room: string } }) {
  const user = api().user.get()
  const deck = api().deck.getAdvanced('standard')

  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <div className="flex items-center justify-between">
          <h1>room: {params.room}</h1>
        </div>

        <PlayArea user={user}>
          <Deck deck={deck.data} />
        </PlayArea>
      </main>
    </>
  )
}
