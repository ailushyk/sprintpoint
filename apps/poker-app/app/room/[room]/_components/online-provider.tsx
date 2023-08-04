'use client'

import React, {
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { DeckValue, roomSchema, RoomValue } from '@easypoker/shared'
import { AllUsersResponse, RoomStatusValue } from '@easypoker/shared/src'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { socket, usersSchema } from '@/lib/socket-client'
import { UserProfileValues } from '@/lib/user/user'
import { SetUsernameForm } from '@/app/room/[room]/_components/set-username-form'

const formSchema = z.object({
  risk: z.string(),
  complexity: z.string(),
  unfamiliar: z.string(),
})

export type FormDeckValues = z.infer<typeof formSchema>

type OnlineStateValue = {
  user: UserProfileValues
  room: RoomValue
  status: RoomStatusValue
  users: AllUsersResponse
  deck: DeckValue
  form: UseFormReturn<FormDeckValues>
  defaultValues: FormDeckValues
}

type Action =
  | {
      type: 'init'
      payload: OnlineStateValue
    }
  | { type: 'setRoom'; payload: RoomValue }
  | {
      type: 'setUsers'
      payload: AllUsersResponse
    }
  | {
      type: 'check'
      payload: { users: AllUsersResponse; room: RoomValue }
    }

const reducer = (state: OnlineStateValue, action: Action): OnlineStateValue => {
  switch (action.type) {
    case 'init':
      return { ...state, ...action.payload }
    case 'setRoom':
      return { ...state, room: action.payload }
    case 'setUsers':
      return {
        ...state,
        users: action.payload,
      }
    case 'check':
      return {
        ...state,
        users: action.payload.users,
        room: action.payload.room,
      }
    default:
      throw new Error('Invalid action type')
  }
}

const OnlineContext = React.createContext<{
  state: OnlineStateValue
  dispatch: Dispatch<Action>
}>(null!)

const defaultValues = {
  risk: '',
  complexity: '',
  unfamiliar: '',
}

export const OnlineProvider = ({
  user,
  room,
  deck,
  children,
}: {
  user: UserProfileValues
  room: RoomValue
  deck: DeckValue
  children: React.ReactNode
}) => {
  const [openUserDialog, setOpenUserDialog] = useState(() => false)
  const form = useForm<FormDeckValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const initialState: OnlineStateValue = {
    user,
    room,
    status: 'voting',
    users: [],
    deck,
    form,
    defaultValues,
  }
  const [state, dispatch] = useReducer(reducer, {}, () => initialState)

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
    } else {
      setOpenUserDialog(true)
    }

    return () => {
      socket.disconnect()
    }
  }, [room.code, user.id, user.username])

  useEffect(() => {
    socket.io.on('reconnect', () => {
      socket.emit('room:join', { room: room.code })
    })
    socket.on('room:joined', ({ room }) => {
      roomSchema.parse(room)
      dispatch({ type: 'setRoom', payload: room })
    })
    socket.on('room:checking', (payload) => {
      usersSchema.parse(payload.users)
      dispatch({ type: 'check', payload: payload })
    })
    socket.on('users:all', ({ users }) => {
      usersSchema.parse(users)
      dispatch({ type: 'setUsers', payload: users })
    })
    socket.on('room:reset', ({ room }) => {
      form.reset(defaultValues)
      dispatch({ type: 'setRoom', payload: { ...room } })
    })

    return () => {
      socket.off('reconnect')
      socket.off('room:joined')
      socket.off('room:checking')
      socket.off('users:all')
      socket.off('user:reset')
    }
  }, [form, room.code])

  return (
    <OnlineContext.Provider value={{ state, dispatch }}>
      {children}
      <Dialog defaultOpen open={openUserDialog} onOpenChange={(open) => null}>
        <DialogContent className="abc sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Please set your username</DialogTitle>
          </DialogHeader>

          <SetUsernameForm defaultValues={user} afterSuccess={afterSuccess} />
        </DialogContent>
      </Dialog>
    </OnlineContext.Provider>
  )
}

export const useOnlineContext = () => {
  const context = useContext(OnlineContext)
  if (!context) {
    throw new Error('usePlayArea must be used within a OnlineProvider')
  }
  return context
}
