'use client'

import React, { useEffect, useTransition } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Icons,
} from '@easypoker/ui'

import { CreateRoomForm } from '@/app/(home)/_components/create-room-form'
import { getUsername } from '@/app/playActions'
import { AppHeader } from '@/app/room/_components/app-header'
import { Deck } from '@/app/room/_components/deck/Deck'
import { SetUsernameForm } from '@/app/room/_components/set-username-form'

export default function PlayRoomPage({ params }: { params: { room: string } }) {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [isPending, startTransition] = useTransition()
  const [username, setUsername] = React.useState('')
  const checkUsername = async () => {
    const username = await getUsername()
    if (!username) {
      setOpenDialog(true)
    } else {
      setUsername(username.value)
    }
  }

  useEffect(() => {
    startTransition(async () => {
      await checkUsername()
    })
  }, [openDialog])

  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <div className="flex items-center">
          <h1>room: {params.room}</h1>
          {isPending && <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />}
        </div>

        <Deck />
      </main>

      <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          !open && setOpenDialog(false)
        }}
      >
        <DialogContent className="abc sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
          </DialogHeader>
          <SetUsernameForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
