import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'
import { Deck } from '@/components_next/deck/Deck'

import { api } from '@/lib/api'
import { UserDialog } from '@/app/room/[room]/_components/user-dialog'

export default function PlayRoomPage({ params }: { params: { room: string } }) {
  const user = api().user.get()
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

      <UserDialog defaultValues={user} />
    </>
  )
}
