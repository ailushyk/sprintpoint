'use client'

import React, { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, ButtonProps } from '@easypoker/ui'

import { socket } from '@/lib/socket-client'
import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'

const easyAnimation = [0.36, 0.66, 0.04, 1]
const flipVariants = {
  open: {
    scaleY: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: easyAnimation },
  },
  close: {
    scaleY: 0,
    y: -6,
    opacity: 0,
    transition: { duration: 0.1, ease: easyAnimation },
  },
}

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
    <AnimatePresence mode="wait">
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
  )
}
