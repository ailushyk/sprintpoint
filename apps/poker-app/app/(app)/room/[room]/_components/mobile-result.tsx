'use client'

import React, { useEffect } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
} from 'framer-motion'

import {
  Button,
  buttonVariants,
  cn,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  Icons,
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
  const controls = useAnimationControls()

  const isChecking = room.status === 'checking'
  const votesCount = users.filter((u) => u.vote?.value).length

  useEffect(() => {
    setOpen(isChecking)
  }, [isChecking])

  let handleNextVote = () => {
    socket.emit('room:reset', { room: room.code })
  }

  const closeDrawer = async () => {
    await controls.start('closed')
    setOpen(false)
  }

  const fullOpen = async () => {
    await controls.start('fullOpen')
  }

  const variants: Variants = {
    open: {
      y: 0,
      transition: { ease: 'easeOut', duration: 0.2 },
    },
    fullOpen: {
      // top: 0,
      // bottom: 0,
      maxHeight: '100%',
    },
    closed: {
      y: '100%',
      transition: { ease: 'easeIn', duration: 0.2 },
    },
  }

  useEffect(() => {
    if (open) {
      controls.start('open').then()
    }
  }, [controls, open])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={isChecking ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
            delay: isChecking ? 0.4 : 0,
          }}
          disabled={room.status === 'voting' && !open}
          className={cn(
            buttonVariants({
              variant: 'ghost',
              size: 'lg',
            })
          )}
        >
          Votes
        </motion.button>
      </DrawerTrigger>

      <AnimatePresence>
        {open && (
          <DrawerPortal forceMount>
            <DrawerOverlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DrawerOverlay>
            <DrawerContent asChild>
              <motion.div
                className={cn('fixed inset-x-0 bottom-0 z-50 max-h-[46%]')}
                initial="closed"
                animate={controls}
                exit="closed"
                variants={variants}
              >
                <motion.div
                  className="overflow-hidden rounded-t-3xl border-t bg-background px-3 py-6 dark:bg-drawer"
                  drag="y"
                  dragSnapToOrigin
                  onDragEnd={async (event, info) => {
                    if (info.offset.y > 60) {
                      await closeDrawer()
                    }
                    if (info.offset.y < -60) {
                      await fullOpen()
                    }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {votesCount ? (
                    <div className="flex flex-col space-y-2 border-b pb-2 pt-6 text-center dark:border-primary-foreground sm:text-left">
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
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 border-b pb-2 pt-6 text-center dark:border-primary-foreground sm:text-left">
                      <DrawerTitle>No votes yet</DrawerTitle>
                    </div>
                  )}

                  <div className="mb-4 flex-1 overflow-y-auto">
                    <Results user={user} />
                    <MockUsers visible={false} />
                  </div>

                  <div
                    className={cn(
                      'flex flex-col-reverse items-center justify-center md:flex-row md:justify-end md:space-x-2'
                    )}
                  >
                    <Button
                      onClick={handleNextVote}
                      variant="destructive"
                      size="lg"
                    >
                      Next vote
                    </Button>
                  </div>

                  <div className="absolute inset-x-0 top-4 mx-auto mb-8 h-[0.35rem] w-16 flex-shrink-0 rounded-full bg-muted" />
                  <DrawerClose className="absolute right-4 top-4 hidden rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary md:block">
                    <Icons.close className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DrawerClose>
                </motion.div>
              </motion.div>
            </DrawerContent>
          </DrawerPortal>
        )}
      </AnimatePresence>
    </Drawer>
  )
}
