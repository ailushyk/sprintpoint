'use client'

import React from 'react'

import { cn } from '@easypoker/ui'

import { UserProfileValues } from '@/lib/user/user'
import { usePlayArea } from '@/app/room/[room]/_components/play-area-provider'
import { UserList } from '@/app/room/[room]/_components/user-list'

export function Results(props: { user: UserProfileValues }) {
  const { status, room, users } = usePlayArea()

  const self = (user) => user.id === props.user.id

  if (status !== 'checking') return null

  return (
    <UserList>
      {users.map((user) => (
        <UserList.Item key={user.id}>
          <div className={cn(self(user) && 'underline underline-offset-2')}>
            {user.username}
          </div>
          <div>
            {user.vote?.value ?? (
              <span className="flex h-4 w-4 items-center justify-center text-destructive">
                -
              </span>
            )}
          </div>
        </UserList.Item>
      ))}
    </UserList>
  )
}
