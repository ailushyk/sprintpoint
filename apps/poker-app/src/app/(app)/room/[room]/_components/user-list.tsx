import React from 'react'

import { cn } from '@easypoker/ui'

const UserList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="flex flex-col divide-y rounded-lg bg-background px-3">
      {children}
    </ul>
  )
}

const UserListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="py-2">
      <div className={cn('flex items-center justify-between gap-3')}>
        {children}
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
