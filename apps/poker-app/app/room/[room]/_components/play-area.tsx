'use client'

import React, { useEffect, useState } from 'react'

import { SocketDataValue } from '@easypoker/shared'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { RoomValue } from '@/lib/room'
import { socket, usersSchema } from '@/lib/socket-client'
import { UserProfileValues } from '@/lib/user/user'
import { SetUsernameForm } from '@/app/room/[room]/_components/set-username-form'
import { UserList } from '@/app/room/[room]/_components/user-list'

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
  const [users, setUsers] = useState<SocketDataValue[]>([])

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
    socket.on('users:all', (users) => {
      usersSchema.parse(users)
      setUsers(users)
    })

    socket.on('user:status', (data) => {
      setUsers((prev) => {
        return prev.map((_user) => {
          if (_user.id === data.user.id) {
            return {
              ..._user,
              status: data.user.status,
            }
          }
          return _user
        })
      })
    })

    return () => {
      socket.off('users')
      socket.off('user:status')
    }
  }, [user.username])

  return (
    <div className="flex flex-col gap-16 lg:flex-row">
      <div className="flex flex-col gap-4 lg:max-w-xs">
        <div className="flex items-center justify-between">
          <h1>room: {room.name ?? room.id}</h1>
        </div>

        <UserList>
          {users.map((_user) => (
            <UserList.Item
              key={_user.id}
              user={_user}
              self={_user.id === user.id}
            />
          ))}
        </UserList>
      </div>

      {children}

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
