'use client'

import React, { useEffect, useState } from 'react'
import { Reorder } from 'framer-motion'

import { UserResponse } from '@easypoker/shared/src'
import { cn } from '@easypoker/ui'

import { UserProfileValues } from '@/lib/api/api-types'
import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'
import { UserStatus } from '@/app/(app)/room/[room]/_components/user-status'

function compareStatus(a, b) {
  // If the status is the same, compare by "lastUpdate" timestamp (converted to timestamps)
  const timestampA = new Date(a.vote.lastUpdate).getTime()
  const timestampB = new Date(b.vote.lastUpdate).getTime()
  const diff = timestampB - timestampA

  // if (a.vote.status === b.vote.status) {
  //   return a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
  // }
  if (a.vote.status !== 'voting' && b.vote.status === 'voting') {
    return 1
  }
  if (a.vote.status === 'voting' && b.vote.status !== 'voting') {
    return -1
  }
  if (a.vote.status !== 'voted' && b.vote.status === 'voted') {
    return -1
  }
  if (a.vote.status === 'voted' && b.vote.status !== 'voted') {
    return 1
  }
  return diff
}

function compareValue(a, b) {
  if (a.vote.value === b.vote.value) {
    return a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
  }
  return a.vote.value - b.vote.value
}

export const UsersBoard = () => {
  const {
    state: { user, users, room },
  } = useOnlineContext()
  const isChecking = room.status === 'checking'
  const self = (u: UserResponse) => u.id === user?.id

  const [sortedItems, setSortedItems] = useState(users)

  useEffect(() => {
    let _users = [...users].sort(isChecking ? compareValue : compareStatus)
    setSortedItems(_users)
  }, [isChecking, users])

  return (
    <Reorder.Group
      drag={false}
      values={sortedItems}
      onReorder={() => {}}
      className="flex flex-col divide-y rounded-lg bg-background px-3"
    >
      {sortedItems.map((user, index) => (
        <Reorder.Item key={`${user.id}-sortable-list`} value={user}>
          <div className={cn('flex items-center justify-between gap-3 py-2')}>
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
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
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
