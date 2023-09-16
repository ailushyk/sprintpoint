'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Room } from '@easypoker/shared/src/refactor-types'
import { Button, cn, Icons } from '@easypoker/ui'

import { useClipboard } from '@/hooks/use-clipboard'

export const RoomTitle = ({
  room,
  className,
}: {
  room: Room
  className?: string
}) => {
  const { isPending, copy } = useClipboard()

  const handleClipboardCopy = async (value: string) => {
    await copy(value, `Room code "${value}" copied to clipboard`)
  }

  return (
    <div
      className={cn(
        'relative flex items-center gap-2 text-muted-foreground',
        className
      )}
    >
      <h1 className="col-span-2 row-[1/2] text-base">
        {room.name || room.code}
      </h1>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-10 row-[2/3] disabled:opacity-100 max-sm:hidden"
        onClick={() => handleClipboardCopy(room.code)}
        disabled={isPending}
      >
        <AnimatePresence mode="popLayout">
          {isPending ? (
            <motion.div
              key="clipboard-check"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Icons.clipboardCheck className="h-4 w-4 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="clipboard-copy"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Icons.clipboardCopy className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}
