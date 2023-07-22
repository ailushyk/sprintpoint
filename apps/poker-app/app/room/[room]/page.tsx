import React from 'react'

import { api } from '@/lib/api'
import { AppHeader } from '@/app/room/_components/app-header'
import { Deck } from '@/app/room/_components/deck/Deck'
import { UserDialog } from '@/app/room/[room]/user-dialog'

export default function PlayRoomPage({ params }: { params: { room: string } }) {
  const deck = api().deck.getAdvanced('standard')

  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <div className="flex items-center">
          <h1>room: {params.room}</h1>
          {/*{isPending && <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />}*/}
        </div>

        <Deck deck={deck.data} />
      </main>

      <UserDialog />
    </>
  )
}
