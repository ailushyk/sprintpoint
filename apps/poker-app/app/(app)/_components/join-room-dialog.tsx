'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { JoinRoomForm } from '@/app/(app)/_components/join-room-form'

export const JoinRoomDialog = () => {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) setOpen(false)
        else router.back()
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
        </DialogHeader>

        <JoinRoomForm />
      </DialogContent>
    </Dialog>
  )
}
