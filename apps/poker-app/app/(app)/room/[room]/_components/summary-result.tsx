'use client'

import React from 'react'

import { cn } from '@easypoker/ui'

import { PickedCard } from '@/components/deck/PickedCard'
import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'

export function SummaryResult() {
  const {
    state: { room, users },
  } = useOnlineContext()
  const votesCount = users.filter((u) => u.vote?.value).length

  const _sp = room.status === 'checking' && votesCount ? room.value! : null

  return (
    <>
      <PickedCard sp={_sp} className="h-16 w-16 bg-background" />
    </>
  )
}
