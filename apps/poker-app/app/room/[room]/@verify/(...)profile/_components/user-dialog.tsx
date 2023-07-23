'use client'

import React, { useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { UserProfileValues } from '@/lib/user/user'
import { SetUsernameForm } from '@/app/room/[room]/@verify/(...)profile/_components/set-username-form'

export const UserDialog = ({
  defaultValues,
}: {
  defaultValues: UserProfileValues
}) => {
  const router = useRouter()
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        !open && router.back()
      }}
    >
      <DialogContent className="abc sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Please set your username</DialogTitle>
        </DialogHeader>

        <SetUsernameForm defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}
