'use client'

import React from 'react'

import { cn } from '@easypoker/ui'

import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'

export function SummaryResult() {
  const {
    state: { room, users },
  } = useOnlineContext()
  const votesCount = users.filter((u) => u.vote?.value).length

  const showResult = room.status === 'checking' && votesCount

  return (
    <>
      <div
        className={cn(
          'flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 bg-accent text-2xl text-muted-foreground transition dark:bg-background',
          showResult && 'border-primary text-primary'
        )}
      >
        {showResult ? room.value : '-'}
      </div>
    </>
  )
}
