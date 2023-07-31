'use client'

import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { JoinRoomForm } from '@/app/(home)/_components/join-room-form'

export const JoinRoomDialog = () => {
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
          <DialogTitle>Join Room</DialogTitle>
        </DialogHeader>
        <JoinRoomForm />
      </DialogContent>
    </Dialog>
  )
}
