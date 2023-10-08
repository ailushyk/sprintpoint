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

const easyAnimation = [0.36, 0.66, 0.04, 1]
const showMock = false
const variants: Variants = {
  open: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: easyAnimation },
  },
  fullOpen: {
    top: 'var(--top-full-open)',
    transition: { duration: 0.4, ease: easyAnimation },
  },
  closed: {
    x: 'var(--x-from, 0)',
    y: 'var(--y-from, 0)',
    opacity: 0,
    transition: { duration: 0.3, ease: easyAnimation },
  },
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
                animate={{
                  opacity: 1,
                  transition: { duration: 0.4, ease: easyAnimation },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, ease: easyAnimation },
                }}
              />
            </DrawerOverlay>
            <DrawerContent asChild>
              <motion.div
                className={cn(
                  'fixed inset-x-0 bottom-0 z-50 ml-auto md:left-0 md:top-0 md:max-w-sm',
                  'top-1/2 [--top-full-open:2rem] sm:top-1/3 md:top-0 md:[--top-full-open:0]',
                  'max-md:[--y-from:100%]',
                  'md:[--x-from:100%]',
                  'md:[--motion-opacity-from:0]'
                )}
                initial="closed"
                animate={controls}
                exit="closed"
                variants={variants}
                drag="y"
                dragSnapToOrigin
                onDragEnd={async (event, info) => {
                  if (info.offset.y < -5) {
                    await fullOpen()
                  }
                  if (info.offset.y > 30) {
                    await closeDrawer()
                  }
                }}
              >
                <div className="rounded-t-3xl border-t bg-background dark:bg-drawer md:rounded-none">
                  {votesCount ? (
                    <div className="flex flex-col space-y-2 border-b px-3 py-6 text-center dark:border-primary-foreground sm:text-left">
                      <DrawerTitle className="flex flex-col items-center justify-center gap-1 pt-2">
                        <div className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-primary bg-accent p-4 text-4xl transition hover:bg-accent hover:text-accent-foreground dark:border-primary dark:bg-background">
                          {/* @ts-ignore */}
                          {room.value}
                        </div>
                      </DrawerTitle>
                      <DrawerDescription>
                        {votesCount === users.length
                          ? 'All votes in'
                          : `${votesCount} of ${users.length} votes`}
                      </DrawerDescription>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 border-b px-3 py-6 text-center dark:border-primary-foreground sm:text-left">
                      <DrawerTitle>No votes yet</DrawerTitle>
                    </div>
                  )}

                  <div className="h-screen flex-1 space-y-6 overflow-y-auto px-3 pb-64">
                    <Results user={user} />
                    <MockUsers visible={showMock} />
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
                  </div>

                  <div className="absolute inset-x-0 top-2 mx-auto mb-8 h-[0.35rem] w-12 flex-shrink-0 rounded-full bg-muted" />
                  <DrawerClose asChild className="absolute right-4 top-4">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Icons.close className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </DrawerClose>
                </div>
              </motion.div>
            </DrawerContent>
          </DrawerPortal>
        )}
      </AnimatePresence>
    </Drawer>
  )
}

export function MockUsers({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <UserList>
      {Array.from({ length: 7 }).map((_, i) => (
        <UserList.Item key={i}>
          <div className="truncate">User {i}</div>
          idle
        </UserList.Item>
      ))}
    </UserList>
  )
}
