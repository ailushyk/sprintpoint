'use client'

import React, { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { socket } from '@/lib/socket'
import { UserProfileValues } from '@/lib/user/user'
import { SetUsernameForm } from '@/app/room/[room]/_components/set-username-form'

export const PlayArea = ({
  user,
  children,
}: {
  user: UserProfileValues
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
    if (!user?.username) setOpen(true)
  }, [user.username])

  useEffect(() => {
    // client-side
    socket.on('connect', () => {
      console.log('socket connected')
      console.log(socket.id)
    })

    socket.on('disconnect', () => {
      console.log('socket disconnected')
    })

    return () => {
      // cleanup the socket connection when the component unmounts
      socket.disconnect()
    }
  }, [])

  return (
    <div>
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
