import React from 'react'

import { AllUsersResponse, PlayStatusValue } from '@easypoker/shared'
import { Icons } from '@easypoker/ui'

export const UserStatus = ({ user }: { user: AllUsersResponse[number] }) => {
  console.log('user', user)
  const getStatus = (user) => {
    if (user.status === 'on-hold') {
      return 'on-hold'
    }
    if (user.status === 'offline') {
      return 'offline'
    }
    // if (user.status === 'idle') {
    //   return 'idle'
    // }
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

  const status = getStatus(user)

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
