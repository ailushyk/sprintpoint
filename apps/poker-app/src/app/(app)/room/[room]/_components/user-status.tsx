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
    <div className="flex w-8 flex-shrink-0 items-center justify-center">
      {node}
    </div>
  )
}

function getStatus(user: UserResponse): string {
  return user.vote.status

  // if (user.status === 'offline') return 'offline'

  // if (user.status === 'on-hold') return 'on-hold'

  // const status = user.vote.status
  // if (status === 'voting') {
  //   return checkIfUserIsActuallyVoting(user) ? 'voting' : 'idle'
  // }
  // return status
}

function checkIfUserIsActuallyVoting(user: AllUsersResponse[number]) {
  let now = new Date()
  let lastUpdate = new Date(user.vote?.lastUpdate ?? user.lastUpdate)
  let diff = now.getTime() - lastUpdate.getTime()
  let seconds = Math.floor(diff / 1000)
  // TODO: make this configurable
  return seconds < 1
}
