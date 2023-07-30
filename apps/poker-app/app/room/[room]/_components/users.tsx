'use client'

import React from 'react'

import { cn } from '@easypoker/ui'

import { UserProfileValues } from '@/lib/user/user'
import { usePlayArea } from '@/app/room/[room]/_components/play-area-provider'
import { UserList } from '@/app/room/[room]/_components/user-list'
import { UserStatus } from '@/app/room/[room]/_components/user-status'

export const Users = (props: { user: UserProfileValues }) => {
  const { users, status } = usePlayArea()
  const self = (user) => user.id === props.user.id

  if (status !== 'voting') return null

  return (
    <UserList>
      {users.map((user) => (
        <UserList.Item key={user.id}>
          <div className={cn(self(user) && 'underline underline-offset-2')}>
            {user.username}
          </div>
          <UserStatus user={user} />
        </UserList.Item>
      ))}
    </UserList>
  )
}
