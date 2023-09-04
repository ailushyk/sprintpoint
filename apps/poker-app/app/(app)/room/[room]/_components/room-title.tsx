'use client'

import React, { useTransition } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import { RoomValue } from '@easypoker/shared'
import { Button, buttonVariants, cn, Icons } from '@easypoker/ui'

import { useClipboard } from '@/hooks/use-clipboard'

export const RoomTitle = ({
  room,
  className,
}: {
  room: RoomValue
  className?: string
}) => {
  const { isPending, copy } = useClipboard()

  const handleClipboardCopy = async (value: string) => {
    await copy(value, `Room code "${value}" copied to clipboard`)
  }

  return (
    <div
      className={cn('flex items-center gap-2 text-muted-foreground', className)}
    >
      <Button
        variant="ghost"
        size="icon"
        className="relative disabled:opacity-100"
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
      <h1>{room.name || room.code}</h1>
      <Link
        href={`/room/${room.code}/settings`}
        className={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'icon',
          })
        )}
      >
        <Icons.mix />
      </Link>
    </div>
  )
}
