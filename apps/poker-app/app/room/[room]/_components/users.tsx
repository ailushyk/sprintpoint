'use client'

import React, { useEffect } from 'react'

import { AllUsersResponse } from '@easypoker/shared/src'
import { cn } from '@easypoker/ui'

import { UserProfileValues } from '@/lib/user/user'
import { usePlayArea } from '@/app/room/[room]/_components/play-area-provider'
import { UserList } from '@/app/room/[room]/_components/user-list'
import { UserStatus } from '@/app/room/[room]/_components/user-status'

export const Users = (props: { user: UserProfileValues }) => {
  const { users, status } = usePlayArea()
  const self = (user) => user.id === props.user.id

  const getStatus = (user) => {
    if (typeof user.vote === 'undefined') {
      return 'idle'
    }

    if (user.vote?.value) {
      return 'voted'
    }

    if (checkIfUserIsActuallyVoting(user)) {
      return 'voting'
    }

    return 'idle'
  }

  if (status !== 'voting') return null

  return (
    <UserList>
      {users.map((user) => (
        <UserList.Item key={user.id}>
          <div className={cn(self(user) && 'underline underline-offset-2')}>
            {user.username}
          </div>
          <UserStatus status={getStatus(user)} />
        </UserList.Item>
      ))}
    </UserList>
  )
}

function checkIfUserIsActuallyVoting(user: AllUsersResponse[number]) {
  let now = new Date()
  let lastUpdate = new Date(user.vote?.lastUpdate ?? user.lastUpdate)
  let diff = now.getTime() - lastUpdate.getTime()
  let seconds = Math.floor(diff / 1000)
  // console.log('now', now)
  // console.log('lastUpdate', lastUpdate)
  console.log('seconds', diff, seconds)
  return seconds <= 3
}
