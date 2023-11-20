'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, Deck as DeckType, Round, Session } from '@prisma/client'

import { buttonVariants, cn, Icons, Separator } from '@easypoker/ui'

import { PickedCard } from '@/components/deck/PickedCard'
import { CheckButton } from '@/app/(app)/s/[sessionId]/_components/check-button'
import { Deck } from '@/app/(app)/s/[sessionId]/_components/deck'
import { UsersBoard } from '@/app/(app)/s/[sessionId]/_components/users-board'
import { nextRound } from '@/app/actions'

export function SessionClient({
  session,
}: {
  session: Session & {
    rounds: Array<Round>
    deck: DeckType & {
      cards: Array<Card>
    }
  }
}) {
  const params = useParams()
  const value = null // 'SP'
  const users = []
  const lastRound = session.rounds?.[0]

  return (
    <main className="flex w-full flex-1 flex-col space-y-8 pb-40">
      <div className="sticky top-0 bg-background">
        <div className="container mx-auto flex max-w-xl items-center justify-between gap-6 py-3">
          <PickedCard sp={value} className="h-16 w-16 bg-background" />
          <div>
            <Link
              href={`/s/${params.sessionId}/settings`}
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
            <input type="hidden" name="session-id" value={session.id} />
            <input
              type="hidden"
              name="next-round"
              value={session.rounds?.length + 1}
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
        <div>Rounds: {session.rounds.length}</div>
        <div>
          {session.rounds.map((round) => (
            <div key={round.id}>
              <div>ID: {round.id}</div>
              <div>Status: {round.status}</div>
            </div>
          ))}
        </div>
      </div>

      <Deck
        deck={session.deck}
        status={lastRound.status}
        round={lastRound.order}
      />
    </main>
  )
}
