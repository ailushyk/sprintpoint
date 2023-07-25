'use client'

import React, { useEffect, useState } from 'react'

import { SocketData } from '@easypoker/shared'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  toast,
} from '@easypoker/ui'

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
  const [openUserDialog, setOpenUserDialog] = useState(() => false)
  const [isConnected, setIsConnected] = useState(false)
  const [users, setUsers] = useState<SocketData[]>([])

  const afterSuccess = ({ username }: { username: string }) => {
    setOpenUserDialog(false)
  }

  /**
   * Check if user has username. Open form in modal if not
   */
  useEffect(() => {
    if (user?.username) {
      setIsConnected(true)
      socket.auth = { id: user.id, username: user.username }
      socket.connect()
    } else {
      setOpenUserDialog(true)
    }

    return () => {
      socket.disconnect()
    }
  }, [user.id, user.username])

  useEffect(() => {
    socket.on('users', (users) => {
      console.log('users', users)
      setUsers(users)
    })

    socket.on('user:connected', (data) => {
      toast({
        title: `${data.user.username} connected`,
      })
      setUsers(data.users)
    })

    return () => {
      socket.off('users')
      socket.off('user:connected')
    }
  }, [user.username])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>room: {room.name ?? room.id}</h1>
      </div>

      {children}

      <ul>
        {users.map((_user) => (
          <li key={_user.id}>
            {_user.username}{' '}
            <span className="text-muted-foreground">{_user.id}</span>{' '}
            {_user.id === user.id && ' (you)'}
          </li>
        ))}
      </ul>

      <Dialog defaultOpen open={openUserDialog} onOpenChange={(open) => null}>
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
