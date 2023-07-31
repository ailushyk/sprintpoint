import React from 'react'

import { Icons } from '@easypoker/ui'

export function OfflineMessage() {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      Offline
      <Icons.offline className="h-4 w-4" />
    </div>
  )
}
