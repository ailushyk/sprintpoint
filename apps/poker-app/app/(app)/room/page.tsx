import * as React from 'react'

import { cn } from '@easypoker/ui'

import { api } from '@/lib/api'
import { AppHeader } from '@/components/app-header/app-header'
import { SubmitButton } from '@/components/submit-button'
import { createRoom } from '@/app/actions'

export const metadata = {
  title: 'Start New Session',
}

export default async function RoomNewPage() {
  const user = await api().user.get()
  const decks = await api().deck.all()

  return (
    <div className="w-full space-y-8">
      <AppHeader links={[{ href: '/dashboard', label: 'Dashboard' }]} />

      <div className="container max-w-2xl flex-1 space-y-8">
        <h1 className="text-4xl font-bold">Start New Session</h1>

        <div>
          <form className="flex flex-col gap-6" action={createRoom}>
            <div className={cn('space-y-2')}>
              <input type="hidden" name="user" value={user?.id} />
              <select name="deck" id="deck">
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.name}
                  </option>
                ))}
              </select>
              {/*<Label>Deck</Label>*/}
              {/*<Input name="bac" />*/}
              {/*<p className="text-[0.8rem] text-muted-foreground">*/}
              {/*  The code is 8 characters long and is case sensitive.*/}
              {/*</p>*/}
              {/*<p className="text-[0.8rem] font-medium text-destructive">*/}
              {/*  message*/}
              {/*</p>*/}
            </div>
            <div className="text-right">
              <SubmitButton>Start</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
