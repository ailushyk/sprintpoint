'use client'

import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@easypoker/ui'

import { CreateRoomForm } from '@/app/(home)/_components/create-room-form'

export const CreateRoomDialog = () => {
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
          <DialogTitle>Create Room</DialogTitle>
        </DialogHeader>
        <CreateRoomForm />
      </DialogContent>
    </Dialog>
  )
}
