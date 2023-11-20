import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { buttonVariants, cn, Icons, Separator } from '@easypoker/ui'

import { api } from '@/lib/api/api'
import { AppHeader } from '@/components/app-header/app-header'
import { PickedCard } from '@/components/deck/PickedCard'
import { CheckButton } from '@/app/(app)/s/[sessionId]/_components/check-button'
import { Deck } from '@/app/(app)/s/[sessionId]/_components/deck'
import { UsersBoard } from '@/app/(app)/s/[sessionId]/_components/users-board'
import { nextRound } from '@/app/actions'

export default async function SessionPage({ params }) {
  const fastSession = await api().session.get(params.sessionId)
  if (!fastSession) {
    notFound()
  }

  const value = null // 'SP'
  const users = []

  const lastRound = fastSession.rounds[0]

  return (
    <>
      <AppHeader />

      <main className="flex w-full flex-1 flex-col space-y-8 pb-40">
        <div className="sticky top-0 bg-background">
          <div className="container mx-auto flex max-w-xl items-center justify-between gap-6 py-3">
            <PickedCard sp={value} className="h-16 w-16 bg-background" />
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
            <form action={nextRound}>
              <input type="hidden" name="session-id" value={fastSession.id} />
              <input
                type="hidden"
                name="next-round"
                value={fastSession.rounds.length + 1}
              />
              <CheckButton status={lastRound.status} className="h-16 w-16" />
            </form>
          </div>
          <Separator />
        </div>

        <div className="container mx-auto w-full max-w-xl flex-1">
          <UsersBoard status={lastRound.status} users={users} />
        </div>

        <p>Session id: {params.sessionId}</p>
        <div>
          <div>Rounds: {fastSession.rounds.length}</div>
          <div>
            {fastSession.rounds.map((round) => (
              <div key={round.id}>
                <div>ID: {round.id}</div>
                <div>Status: {round.status}</div>
              </div>
            ))}
          </div>
        </div>

        <Deck
          deck={fastSession.deck}
          status={lastRound.status}
          round={lastRound.order}
        />
      </main>
    </>
  )
}
