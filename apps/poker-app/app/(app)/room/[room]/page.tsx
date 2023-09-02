import React from 'react'
import { Metadata } from 'next'

import { Separator } from '@easypoker/ui'

import { api } from '@/lib/api'
import { CheckButton } from '@/app/(app)/room/[room]/_components/check-button'
import { MockUsers } from '@/app/(app)/room/[room]/_components/mobile-result'
import { NewDeck } from '@/app/(app)/room/[room]/_components/new-deck'
import { OnlineProvider } from '@/app/(app)/room/[room]/_components/online-provider'
import { RoomTitle } from '@/app/(app)/room/[room]/_components/room-title'
import { SummaryResult } from '@/app/(app)/room/[room]/_components/summary-result'
import { UsersBoard } from '@/app/(app)/room/[room]/_components/users-board'

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
    <main className="flex w-full flex-1 flex-col space-y-8 pb-40">
      <OnlineProvider user={user} room={room} deck={deck.data}>
        <div className="sticky top-0 bg-background">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-6 py-6">
            <SummaryResult />
            <div>
              <RoomTitle room={room} />
            </div>
            <CheckButton className="h-16 w-16" />
          </div>
          <Separator />
        </div>

        <div className="mx-auto w-full max-w-xl flex-1">
          <UsersBoard user={user} />
          <MockUsers visible={false} />
        </div>

        <NewDeck />
      </OnlineProvider>
    </main>
  )
}
