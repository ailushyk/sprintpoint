'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

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
import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'
import { Results } from '@/app/(app)/room/[room]/_components/results'
import { UserList } from '@/app/(app)/room/[room]/_components/user-list'

export function MockUsers({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <UserList>
      {Array.from({ length: 39 }).map((_, i) => (
        <UserList.Item key={i}>
          <div className="truncate">user {i}</div>
          idle
        </UserList.Item>
      ))}
    </UserList>
  )
}

export function MobileResult({ user }: { user: UserProfileValues }) {
  const [open, setOpen] = React.useState(false)
  const {
    state: { room, users },
  } = useOnlineContext()

  const isChecking = room.status === 'checking'
  const votesCount = users.filter((u) => u.vote?.value).length

  useEffect(() => {
    setOpen(isChecking)
  }, [isChecking])

  let handleNextVote = () => {
    socket.emit('room:reset', { room: room.code })
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isChecking ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
            delay: isChecking ? 0.4 : 0,
          }}
        >
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              disabled={room.status === 'voting' && !open}
            >
              Votes
            </Button>
          </DrawerTrigger>
        </motion.div>
      </div>
      <DrawerContent side="bottom">
        {votesCount ? (
          <DrawerHeader>
            <div className="flex flex-col items-center justify-center gap-1">
              <DrawerTitle>Recommended</DrawerTitle>
              <div className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-primary bg-accent p-4 text-4xl transition hover:bg-accent hover:text-accent-foreground dark:border-primary dark:bg-background">
                {room.value}
              </div>
            </div>
            <DrawerDescription>
              {votesCount === users.length
                ? 'All votes in'
                : `${votesCount} of ${users.length} votes`}
            </DrawerDescription>
          </DrawerHeader>
        ) : (
          <DrawerHeader>
            <DrawerTitle>No votes yet</DrawerTitle>
          </DrawerHeader>
        )}

        <DrawerBody>
          <Results user={user} />
          <MockUsers visible={true} />
        </DrawerBody>

        <DrawerFooter className="flex items-center justify-center">
          <Button onClick={handleNextVote} variant="destructive" size="lg">
            Next vote
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
