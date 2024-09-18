'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const PickedCard = ({
  sp,
  className,
}: {
  sp: string | number | null
  className?: string
}) => {
  return (
    <div
      className={cn(
        'flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 bg-card text-2xl text-muted-foreground transition',
        sp !== null && 'bg-accent-card border-primary text-primary',
        className,
      )}
    >
      <AnimatePresence mode="wait">
        {sp === null ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            -
          </motion.div>
        ) : (
          <motion.div
            key={`value-${sp}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {sp}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 z-50 flex w-full flex-col items-center justify-center bg-background py-2 md:border-none">
      {children}
    </div>
  )
}

PickedCard.Wrapper = Wrapper

export { PickedCard }
