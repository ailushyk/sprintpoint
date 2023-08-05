'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { RoomValue } from '@easypoker/shared'
import { Button, Icons, toast } from '@easypoker/ui'

export const RoomTitle = ({ room }: { room: RoomValue }) => {
  const [isPending, startTransition] = useTransition()
  const [copied, setCopied] = useState(false)

  const handleClipboardCopy = async () => {
    startTransition(() => {
      try {
        navigator.clipboard.writeText(room.code)
        setCopied(true)
        toast({
          title: 'Copied to clipboard',
          description: `Room code "${room.code}" copied to clipboard`,
        })
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error',
          description: 'Could not copy room code to clipboard',
        })
      }
    })
  }

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  return (
    <div className="flex w-full items-center justify-between gap-1">
      <h1>Room: {room.name || room.code}</h1>
      <Button
        size="sm"
        variant="outline"
        className="disabled:opacity-100"
        onClick={handleClipboardCopy}
        disabled={isPending || copied}
      >
        <AnimatePresence mode="popLayout">
          {copied ? (
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
