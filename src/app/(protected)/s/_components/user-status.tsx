import { Icon } from '@/components/ui/Icon'
import React from 'react'

interface UserResponse {
  id: string
  username: string
  vote: {
    status: string
    lastUpdate: string
  }
}
type AllUsersResponse = UserResponse[]

export const UserStatus = ({ user }: { user: AllUsersResponse[number] }) => {
  const status = getStatus(user)
  let node: React.ReactNode
  switch (status) {
    case 'voting':
      node = (
        <Icon.spinner className="h-4 w-4 animate-spin text-muted-foreground" />
      )
      break
    case 'voted':
      node = <Icon.ready className="h-4 w-4" />
      break
    case 'on-hold':
      node = <Icon.hold className="h-4 w-4" />
      break
    case 'offline':
      node = <Icon.offline className="h-4 w-4 text-muted-foreground" />
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
  return 'voted'
  // return user.vote.status
}
