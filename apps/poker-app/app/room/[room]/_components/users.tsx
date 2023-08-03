'use client'

import React from 'react'

import { UserResponse } from '@easypoker/shared/src'
import { cn } from '@easypoker/ui'

import { UserProfileValues } from '@/lib/user/user'
import { useOnlineContext } from '@/app/room/[room]/_components/online-provider'
import { UserList } from '@/app/room/[room]/_components/user-list'
import { UserStatus } from '@/app/room/[room]/_components/user-status'

export const Users = (props: { user: UserProfileValues }) => {
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
          <UserStatus user={user} />
        </UserList.Item>
      ))}
    </UserList>
  )
}
