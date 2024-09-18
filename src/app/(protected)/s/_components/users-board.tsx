'use client'

import { UserStatus } from '@/app/(protected)/s/_components/user-status'
import { cn } from '@/lib/utils'
import { Reorder } from 'framer-motion'
import { useState } from 'react'

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

function useOnlineContext() {
  return {
    state: {
      user: {
        id: '1',
        username: 'John Doe',
      },
      users: [
        {
          id: '1',
          username: 'John Doe',
        },
        {
          id: '2',
          username: 'Alice',
        },
      ],
      room: {
        status: 'voting',
      },
    },
  }
}

interface UserResponse {
  id: string
  username: string
  vote: {
    lastUpdate: string
    status: string
    value: string
  }
}

export const UsersBoard = () => {
  const {
    state: { user, users, room },
  } = useOnlineContext()
  const isChecking = room.status === 'checking'
  const self = (u: UserResponse) => u.id === user?.id

  const [sortedItems, setSortedItems] = useState(users)

  // useEffect(() => {
  //   const _users = [...users].sort(isChecking ? compareValue : compareStatus)
  //   setSortedItems(_users)
  // }, [isChecking, users])

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
                self(user) && 'underline underline-offset-2',
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
