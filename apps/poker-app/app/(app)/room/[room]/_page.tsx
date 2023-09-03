import React from 'react'
import { Metadata } from 'next'

import { Separator } from '@easypoker/ui'

import { api } from '@/lib/api'
import { Deck } from '@/components/deck/Deck'
import { MockUsers } from '@/app/(app)/room/[room]/_components/mobile-result'
import { OnlineProvider } from '@/app/(app)/room/[room]/_components/online-provider'
import { RoomTitle } from '@/app/(app)/room/[room]/_components/room-title'
import { Users } from '@/app/(app)/room/[room]/_components/users'

interface PlayRoomPageProps {
  params: { room: string }
}

export async function generateMetadata({
  params,
}: PlayRoomPageProps): Promise<Metadata> {
  // read route params
  const room = params.room

  // fetch data
  // const product = await fetch(`https://.../${room}`).then((res) => res.json())

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent)?.openGraph?.images || []

  return {
    title: `Play in ${room}`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
    alternates: {
      canonical: `/room/${room}`,
    },
  }
}

export default async function PlayRoomPage({ params }: PlayRoomPageProps) {
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
            <MockUsers visible={false} />
          </div>
        </div>
      </OnlineProvider>
    </main>
  )
}
