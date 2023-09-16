'use client'

import React, { useState } from 'react'

import { Button, Icons, toast } from '@easypoker/ui'

import { createRoom } from '@/app/room-actions'

export const CreateNewRoom = ({ children }: { children: string }) => {
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    try {
      setPending(true)
      await createRoom()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <Button size="lg" onClick={handleClick}>
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
