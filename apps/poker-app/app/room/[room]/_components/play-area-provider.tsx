'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Deck } from '@/components_next/deck/Deck'
import { DeckValue } from '@/components_next/deck/deck.api'
import { Loading } from '@/components_next/Loading'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { roomSchema, RoomValue, SocketDataValue } from '@easypoker/shared'
import { AllUsersResponse } from '@easypoker/shared/src'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { socket, usersSchema } from '@/lib/socket-client'
import { UserProfileValues } from '@/lib/user/user'
import { Results } from '@/app/room/[room]/_components/results'
import { SetUsernameForm } from '@/app/room/[room]/_components/set-username-form'
import { Users } from '@/app/room/[room]/_components/users'

interface PlayContextValue {
  room: RoomValue
  users: AllUsersResponse
  deck: DeckValue
  status: 'waiting' | 'voting' | 'checking'
  updateUsers: (users: Array<SocketDataValue>) => void
  // result: any
}

const PlayContext = React.createContext<PlayContextValue>(null!)

const formSchema = z.object({
  risk: z.string(),
  complexity: z.string(),
  unfamiliar: z.string(),
})

export type FormDeckProps = z.infer<typeof formSchema>

let defaultValues = {
  risk: '',
  complexity: '',
  unfamiliar: '',
}

const reducer = (state: PlayContextValue, action: any) => {
  switch (action.type) {
    case 'init':
      return { ...state, ...action.payload }
    case 'setRoom':
      return { ...state, room: action.payload }
    case 'setUsers':
      return { ...state, users: action.payload, status: 'voting' }
    case 'check':
      return { ...state, users: action.payload, status: 'checking' }
    default:
      throw new Error('Invalid action type')
  }
}

export const PlayAreaProvider = ({
  user,
  room,
  deck,
}: {
  user: UserProfileValues
  room: RoomValue
  deck: DeckValue
}) => {
  const [openUserDialog, setOpenUserDialog] = useState(() => false)
  const [isConnected, setIsConnected] = useState(false)
  const [state, dispatch] = React.useReducer(reducer, {
    room: room,
    users: [],
    deck: deck,
    status: 'voting',
  })
  const form = useForm<FormDeckProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const updateUsers = (users: Array<SocketDataValue>) => {
    dispatch({ type: 'setUsers', payload: users })
  }

  const afterSuccess = ({ username }: { username: string }) => {
    setOpenUserDialog(false)
  }

  /**
   * Check if user has username. Open form in modal if not
   */
  useEffect(() => {
    if (user?.username) {
      socket.auth = { id: user.id, username: user.username }
      socket.connect()
      socket.emit('room:join', { room: room.code })
      setIsConnected(true)
    } else {
      setOpenUserDialog(true)
    }

    return () => {
      socket.disconnect()
    }
  }, [room.code, user.id, user.username])

  useEffect(
    () => {
      socket.io.on('reconnect', () => {
        socket.emit('room:join', { room: room.code })
      })
      socket.on('room:joined', ({ room }) => {
        roomSchema.parse(room)
        dispatch({ type: 'setRoom', payload: room })
      })
      socket.on('room:checking', ({ users }) => {
        usersSchema.parse(users)
        dispatch({ type: 'check', payload: users })
      })
      socket.on('users:all', ({ users }) => {
        usersSchema.parse(users)
        dispatch({ type: 'setUsers', payload: users })
      })
      socket.on('user:reset', () => {
        form.reset(defaultValues)
      })

      return () => {
        socket.off('reconnect')
        socket.off('room:joined')
        socket.off('room:checking')
        socket.off('users:all')
        socket.off('user:reset')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [room.code, user.username]
  )

  const value: PlayContextValue = {
    ...state,
    updateUsers,
  }

  return (
    <PlayContext.Provider value={value}>
      <div className="flex flex-col gap-16 lg:flex-row">
        {isConnected ? (
          <>
            <div className="flex flex-col gap-4 lg:max-w-xs">
              <div className="flex items-center justify-between">
                <h1>room: {room.name || room.code}</h1>
              </div>

              <Users user={user} />
              <Results user={user} />
            </div>

            <Deck form={form} defaultValues={defaultValues} />
          </>
        ) : (
          <Loading />
        )}

        <Dialog defaultOpen open={openUserDialog} onOpenChange={(open) => null}>
          <DialogContent className="abc sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Please set your username</DialogTitle>
            </DialogHeader>

            <SetUsernameForm defaultValues={user} afterSuccess={afterSuccess} />
          </DialogContent>
        </Dialog>
      </div>
    </PlayContext.Provider>
  )
}

export const usePlayArea = () => {
  const context = useContext(PlayContext)
  if (!context) {
    throw new Error('usePlayArea must be used within a PlayArea')
  }
  return context
}
