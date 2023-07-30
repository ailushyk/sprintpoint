import React from 'react'

import { PlayStatusValue } from '@easypoker/shared'
import { Icons } from '@easypoker/ui'

export const UserStatus = ({ status }: { status: PlayStatusValue }) => {
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
