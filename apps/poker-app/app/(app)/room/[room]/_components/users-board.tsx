'use client'

import React from 'react'

import { UserResponse } from '@easypoker/shared/src'
import { cn } from '@easypoker/ui'

import { UserProfileValues } from '@/lib/user/user'
import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'
import { UserList } from '@/app/(app)/room/[room]/_components/user-list'
import { UserStatus } from '@/app/(app)/room/[room]/_components/user-status'

export const UsersBoard = (props: { user: UserProfileValues }) => {
  const {
    state: { users, room },
  } = useOnlineContext()
  const self = (user: UserResponse) => user.id === props.user.id

  return (
    <UserList>
      {users.map((user) => (
        <UserList.Item key={user.id}>
          <div
            className={cn(
              'truncate',
              self(user) && 'underline underline-offset-2'
            )}
          >
            {user.username}
          </div>

          {room.status === 'voting' ? (
            <UserStatus user={user} />
          ) : (
            <UserResult user={user} />
          )}
        </UserList.Item>
      ))}
    </UserList>
  )
}

function UserResult({ user }: { user: UserResponse }) {
  return (
    <div className="flex w-8 flex-shrink-0 items-center justify-center">
      {user.vote?.value ?? (
        <span className="flex h-4 w-4 items-center justify-center text-destructive">
          -
        </span>
      )}
    </div>
  )
}
