'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Button, buttonVariants, cn, Icons } from '@easypoker/ui'

import { createRoom } from '@/app/playActions'

export const PlayGameButton = () => {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const handlePlayAction = () => {
    startTransition(() => {
      createRoom().then((room) => {
        router.push(`/room/${room}`)
      })
    })
  }

  return (
    <Button
      className={cn(buttonVariants({ variant: 'default' }), 'w-32')}
      onClick={handlePlayAction}
    >
      {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Play Game
    </Button>
  )
}
