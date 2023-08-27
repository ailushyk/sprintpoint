import React from 'react'
import { Metadata } from 'next'

import { api } from '@/lib/api'
import { MockUsers } from '@/app/(app)/room/[room]/_components/mobile-result'
import { NewDeck } from '@/app/(app)/room/[room]/_components/new-deck'
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
    <main className="container flex-1 space-y-2 pb-28 md:pb-36">
      <OnlineProvider user={user} room={room} deck={deck.data}>
        <div className="flex justify-center">
          <RoomTitle room={room} />
        </div>

        <div className="mx-auto w-full max-w-xl">
          <Users user={user} />
          <MockUsers visible={true} />
        </div>

        <div className="min-w-xl fixed inset-x-0 bottom-0 border-t-2 bg-background md:pt-6">
          <NewDeck user={user} />
        </div>
      </OnlineProvider>
    </main>
  )
}
