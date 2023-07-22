'use client'

import React, { useEffect, useTransition } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { getUsername } from '@/app/playActions'
import { SetUsernameForm } from '@/app/room/_components/set-username-form'

export const UserDialog = () => {
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
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        !open && setOpenDialog(false)
      }}
    >
      <DialogContent className="abc sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User info</DialogTitle>
        </DialogHeader>
        <SetUsernameForm />
      </DialogContent>
    </Dialog>
  )
}
