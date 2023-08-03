'use client'

import React, { useEffect } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@easypoker/ui'

import { socket } from '@/lib/socket-client'
import { UserProfileValues } from '@/lib/user/user'
import { useOnlineContext } from '@/app/room/[room]/_components/online-provider'
import { Results } from '@/app/room/[room]/_components/results'

function Mock({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <>
      {Array.from({ length: 30 }).map((item, index) => (
        <div key={index} className="mb-2 h-8 w-full rounded-md bg-gray-300" />
      ))}
    </>
  )
}

export function MobileResult({ user }: { user: UserProfileValues }) {
  const [open, setOpen] = React.useState(false)
  const {
    state: { room },
  } = useOnlineContext()

  useEffect(() => {
    // console.log('open:', open)
  }, [open])

  useEffect(() => {
    setOpen(room.status === 'checking')
  }, [room.status])

  let handleNextVote = () => {
    console.log('handleNextVote')
    socket.emit('room:reset', { room: room.code })
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>open</DrawerTrigger>
      <DrawerContent side="bottom">
        <DrawerHeader>
          <DrawerTitle>Result</DrawerTitle>
          <div className="flex justify-center">
            <div className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-primary bg-accent p-4 text-4xl transition hover:bg-accent hover:text-accent-foreground dark:border-primary dark:bg-background">
              100
            </div>
          </div>
          <DrawerDescription>This is the result of the vote</DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          <Results user={user} />
          <Mock visible={false} />
        </DrawerBody>

        <DrawerFooter className="flex items-center justify-center">
          <Button
            className="w-40"
            onClick={handleNextVote}
            variant="destructive"
          >
            Next vote
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
