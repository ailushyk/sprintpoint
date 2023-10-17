import React from 'react'

import { Button, Icons } from '@easypoker/ui'

export function OfflineMessage() {
  return (
    <Button disabled variant="ghost" size="lg">
      Offline
      <Icons.offline className="h-4 w-4" />
    </Button>
  )
}
