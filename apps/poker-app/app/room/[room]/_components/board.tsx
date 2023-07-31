'use client'

import React from 'react'
import { Deck } from '@/components_next/deck/Deck'

import { useOnlineContext } from '@/app/room/[room]/_components/online-provider'
import { Results } from '@/app/room/[room]/_components/results'
import { Users } from '@/app/room/[room]/_components/users'

export const Board = () => {
  const {
    state: { user, room, form, defaultValues },
  } = useOnlineContext()

  return (
    <div className="flex flex-col gap-16 lg:flex-row">
      <>
        <div className="flex flex-col gap-4 lg:max-w-xs">
          <div className="flex items-center justify-between">
            <h1>room: {room.name || room.code}</h1>
          </div>

          <Users user={user} />
          <Results user={user} />
        </div>

        <Deck form={form} defaultValues={defaultValues} />
      </>
    </div>
  )
}
