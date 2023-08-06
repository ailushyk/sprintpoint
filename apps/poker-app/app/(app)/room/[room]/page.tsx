import React from 'react'
import { Deck } from '@/components_next/deck/Deck'

import { cn, Separator } from '@easypoker/ui'

import { api } from '@/lib/api'
import { MockUsers } from '@/app/(app)/room/[room]/_components/mobile-result'
import { OnlineProvider } from '@/app/(app)/room/[room]/_components/online-provider'
import { RoomTitle } from '@/app/(app)/room/[room]/_components/room-title'
import { UserList } from '@/app/(app)/room/[room]/_components/user-list'
import { UserStatus } from '@/app/(app)/room/[room]/_components/user-status'
import { Users } from '@/app/(app)/room/[room]/_components/users'

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
    <main className="container flex-1 pb-24">
      <OnlineProvider user={user} room={room} deck={deck.data}>
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex flex-col gap-8 lg:w-52">
            <div className="flex items-center justify-between text-muted-foreground">
              <RoomTitle room={room} />
            </div>

            <div className="hidden lg:block">
              <Users user={user} />
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="hidden h-auto lg:block"
          />

          <Deck user={user} />

          <div className="lg:hidden">
            <Users user={user} />
            <MockUsers visible />
          </div>
        </div>
      </OnlineProvider>
    </main>
  )
}
