import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'
import { Deck } from '@/components_next/deck/Deck'

import { api } from '@/lib/api'
import { VerifyUsername } from '@/app/room/[room]/_components/verify-username'

export const revalidate = 0

export default function PlayRoomPage({ params }: { params: { room: string } }) {
  const user = api().user.get()
  const deck = api().deck.getAdvanced('standard')

  return (
    <>
      <VerifyUsername user={user} />

      <AppHeader />

      <main className="container flex-1">
        <div className="flex items-center justify-between">
          <h1>room: {params.room}</h1>
        </div>

        <Deck deck={deck.data} />
      </main>
    </>
  )
}
