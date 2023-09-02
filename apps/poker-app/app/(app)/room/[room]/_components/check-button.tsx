'use client'

import React, { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, ButtonProps } from '@easypoker/ui'

import { flipVariants } from '@/lib/animation-variants'
import { socket } from '@/lib/socket-client'
import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'

const FlipButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      initial="close"
      animate="open"
      exit="close"
      variants={flipVariants}
    >
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  )
)
FlipButton.displayName = 'FlipButton'

export function CheckButton() {
  const {
    state: { room },
  } = useOnlineContext()

  const handleNext = () => {
    socket.emit('room:reset', { room: room.code })
  }

  const handleCheck = () => {
    socket.emit('room:check', { room: room.code })
  }

  return (
    <div className="relative">
      <AnimatePresence mode="popLayout">
        {room.status === 'voting' ? (
          <FlipButton
            key="voting"
            onClick={handleCheck}
            size="lg"
            variant="default"
          >
            Check
          </FlipButton>
        ) : (
          <FlipButton
            key="checking"
            onClick={handleNext}
            size="lg"
            variant="destructive"
          >
            Next
          </FlipButton>
        )}
      </AnimatePresence>
    </div>
  )
}
