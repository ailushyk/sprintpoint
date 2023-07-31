import React from 'react'

import { AllUsersResponse } from '@easypoker/shared'
import { UserResponse } from '@easypoker/shared/src'
import { Icons } from '@easypoker/ui'

export const UserStatus = ({ user }: { user: AllUsersResponse[number] }) => {
  const status = getStatus(user)
  let node: React.ReactNode
  switch (status) {
    case 'voting':
      node = (
        <Icons.spinner className="h-4 w-4 animate-spin text-muted-foreground" />
      )
      break
    case 'voted':
      node = <Icons.ready className="h-4 w-4" />
      break
    case 'on-hold':
      node = <Icons.hold className="h-4 w-4" />
      break
    case 'offline':
      node = <Icons.offline className="h-4 w-4 text-muted-foreground" />
      break
    case 'idle':
    default:
      node = (
        <span className="flex h-4 w-4 items-center justify-center text-muted-foreground">
          -
        </span>
      )
      break
  }

  return (
    <div className="flex w-5 flex-shrink-0 items-center justify-center">
      {node}
    </div>
  )
}

function getStatus(user: UserResponse): string {
  if (user.status === 'on-hold') {
    return 'on-hold'
  }
  if (user.status === 'offline') {
    return 'offline'
  }
  if (user.vote?.value) {
    return 'voted'
  }
  if (typeof user.vote === 'undefined') {
    return 'idle'
  }
  if (checkIfUserIsActuallyVoting(user)) {
    return 'voting'
  }
  return 'idle'
}

function checkIfUserIsActuallyVoting(user: AllUsersResponse[number]) {
  let now = new Date()
  let lastUpdate = new Date(user.vote?.lastUpdate ?? user.lastUpdate)
  let diff = now.getTime() - lastUpdate.getTime()
  let seconds = Math.floor(diff / 1000)
  // console.log('now', now)
  // console.log('lastUpdate', lastUpdate)
  // console.log('seconds', diff, seconds)
  return seconds <= 3
}
