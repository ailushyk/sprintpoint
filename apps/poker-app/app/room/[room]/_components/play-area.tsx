'use client'

import React, { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { RoomValue } from '@/lib/room'
import { socket } from '@/lib/socket-client'
import { UserProfileValues } from '@/lib/user/user'
import { SetUsernameForm } from '@/app/room/[room]/_components/set-username-form'

export const PlayArea = ({
  user,
  room,
  children,
}: {
  user: UserProfileValues
  room: RoomValue
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(() => false)

  const afterSuccess = ({ username }: { username: string }) => {
    setOpen(false)
  }

  /**
   * Check if user has username. Open form in modal if not
   */
  useEffect(() => {
    if (user?.username) {
      socket.auth = { username: user.username }
      socket.connect()
    } else {
      setOpen(true)
    }

    return () => {
      user.username && socket.disconnect()
    }
  }, [user.username])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>room: {room.name ?? room.id}</h1>
      </div>

      {children}

      <Dialog defaultOpen open={open} onOpenChange={(open) => null}>
        <DialogContent className="abc sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Please set your username</DialogTitle>
          </DialogHeader>

          <SetUsernameForm defaultValues={user} afterSuccess={afterSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
