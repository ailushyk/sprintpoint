import React from 'react'

import { PlayStatusValue } from '@easypoker/shared'
import { cn, Icons } from '@easypoker/ui'

import { DotsSkeleton } from '@/components/DotsSkeleton'

const UserList = ({ children }: { children: React.ReactNode }) => {
  return <ul>{children}</ul>
}

const UserStatus = ({ status }: { status: PlayStatusValue }) => {
  if (status === 'voting') {
    return (
      <Icons.spinner className="h-4 w-4 animate-spin text-muted-foreground" />
    )
  }

  if (status === 'voted') {
    return <Icons.ready className="h-4 w-4" />
  }

  if (status === 'on-hold') {
    return <Icons.hold className="h-4 w-4" />
  }

  if (status === 'offline') {
    return <Icons.offline className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <span className="flex h-4 w-4 items-center justify-center text-muted-foreground">
      -
    </span>
  )
}

const UserListItem = ({
  user,
  self,
}: {
  user: { id: string; username: string; status: PlayStatusValue }
  self: boolean
}) => {
  return (
    <li>
      <div className={cn('flex items-center justify-between gap-3')}>
        <div className={cn(self && 'underline underline-offset-2')}>
          {user.username}
        </div>
        <UserStatus status={user.status} />
      </div>
    </li>
  )
}

const UserListItemWithVote = () => {
  return (
    <li>
      <div className="flex gap-3">
        <div>username</div>
        <div>status</div>
        <div className="text-muted-foreground">id</div>{' '}
      </div>
    </li>
  )
}

UserList.Item = UserListItem
UserList.ItemWithVote = UserListItemWithVote

export { UserList }
