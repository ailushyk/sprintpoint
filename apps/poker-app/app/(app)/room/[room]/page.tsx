import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants, cn, Icons, Separator } from '@easypoker/ui'

import { CheckButton } from '@/app/(app)/room/[room]/_components/check-button'
import { NewDeck } from '@/app/(app)/room/[room]/_components/new-deck'
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
  return (
    <main className="flex w-full flex-1 flex-col space-y-8 pb-40">
      <div className="sticky top-0 bg-background">
        <div className="container mx-auto flex max-w-xl items-center justify-between gap-6 py-3">
          <SummaryResult />
          <div>
            <Link
              href={`/room/${params.room}/settings`}
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
        <UsersBoard />
      </div>

      <NewDeck />
    </main>
  )
}
