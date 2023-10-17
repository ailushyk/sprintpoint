import React from 'react'

import { BackButton } from '@/components/app-header/back-button'
import { UserNav } from '@/components/app-header/user-nav'
import { RoomTitle } from '@/app/(app)/room/[room]/_components/room-title'

export function RoomHeader({ room }) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <BackButton />
        <div>
          <RoomTitle room={room} />
        </div>
        <div className="flex items-center space-x-3">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
