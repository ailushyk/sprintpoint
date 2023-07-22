'use client'

import React, { useEffect, useTransition } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { UserProfileValues } from '@/lib/user/user'
import { SetUsernameForm } from '@/app/room/[room]/_components/set-username-form'

export const UserDialog = ({
  defaultValues,
}: {
  defaultValues: UserProfileValues
}) => {
  const [openDialog, setOpenDialog] = React.useState('idle')
  const checkUsername = () => {
    if (
      defaultValues.type === 'incognito' &&
      defaultValues.username === 'guest'
    ) {
      setOpenDialog('open')
    }
  }

  useEffect(() => {
    if (openDialog === 'idle') {
      checkUsername()
    }
  }, [openDialog])

  return (
    <Dialog
      open={openDialog === 'open'}
      onOpenChange={(open) => {
        !open && setOpenDialog('close')
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
