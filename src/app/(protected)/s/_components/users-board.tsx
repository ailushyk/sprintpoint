'use client'

import { UserStatus } from '@/app/(protected)/s/_components/user-status'
import { cn } from '@/lib/utils'
import { Reorder } from 'framer-motion'
import { useState } from 'react'

interface TmpOnlineContextValue {
  state: {
    user: UserResponse
    users: UserResponse[]
    room: {
      status: string
    }
  }
}
function useOnlineContext(): TmpOnlineContextValue {
  return {
    state: {
      user: {
        id: '1',
        username: 'John Doe',
        vote: {
          lastUpdate: '2021-09-30T14:00:00',
          status: 'voted',
          value: '5',
        },
      },
      users: [
        {
          id: '1',
          username: 'John Doe',
          vote: {
            lastUpdate: '2021-09-30T14:00:00',
            status: 'voted',
            value: '5',
          },
        },
        {
          id: '2',
          username: 'Alice',
          vote: {
            lastUpdate: '2021-09-30T14:00:00',
            status: 'voted',
            value: '3',
          },
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
  const self = (u: UserResponse) => u.id === user?.id

  const [sortedItems] = useState(users)

  return (
    <Reorder.Group
      drag={false}
      values={sortedItems}
      onReorder={() => {}}
      className="flex flex-col divide-y rounded-lg bg-background px-3"
    >
      {sortedItems.map((user) => (
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
