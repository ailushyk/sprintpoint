import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants, cn, Icons, Separator } from '@easypoker/ui'

import { api } from '@/lib/api'
import { CheckButton } from '@/app/(app)/room/[room]/_components/check-button'
import { MockUsers } from '@/app/(app)/room/[room]/_components/mobile-result'
import { NewDeck } from '@/app/(app)/room/[room]/_components/new-deck'
import { OnlineProvider } from '@/app/(app)/room/[room]/_components/online-provider'
import { SummaryResult } from '@/app/(app)/room/[room]/_components/summary-result'
import { UsersBoard } from '@/app/(app)/room/[room]/_components/users-board'

export interface PlayRoomPageProps {
  params: { room: string }
}

export async function generateMetadata({
  params,
}: PlayRoomPageProps): Promise<Metadata> {
  // read route params
  const room = params.room

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
  const deck = await api().deck.getAdvanced(room.deckType)

  return (
    <main className="flex w-full flex-1 flex-col space-y-8 pb-40">
      <OnlineProvider user={user} room={room} deck={deck.data}>
        <div className="sticky top-0 bg-background">
          <div className="container mx-auto flex max-w-xl items-center justify-between gap-6 py-3">
            <SummaryResult />
            <div>
              <Link
                href={`/room/${room.code}/settings`}
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    size: 'icon',
                  }),
                  'row-[2/3]'
                )}
              >
                <Icons.mix />
              </Link>
            </div>
            <CheckButton className="h-16 w-16" />
          </div>
          <Separator />
        </div>

        <div className="container mx-auto w-full max-w-xl flex-1">
          <UsersBoard user={user} />
          <MockUsers visible={false} />
        </div>

        <NewDeck />
      </OnlineProvider>
    </main>
  )
}
