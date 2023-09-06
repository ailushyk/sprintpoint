'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { Button, Icons } from '@easypoker/ui'

import { createRoom } from '@/app/room-actions'

export const CreateNewRoom = ({ children }: { children: string }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handlePlayAction = () => {
    startTransition(() => {
      createRoom().then((room) => {
        router.push(`/room/${room}`)
      })
    })
  }

  return (
    <Button size="lg" onClick={handlePlayAction}>
      {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
