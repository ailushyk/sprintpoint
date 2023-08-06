import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@easypoker/ui'

const PickedCard = ({ sp }: { sp: number | null }) => {
  return (
    <div
      className={cn(
        'flex h-20 w-20 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-muted bg-popover p-4 text-4xl transition lg:rounded-md',
        sp === null ? 'border-muted text-muted' : 'border-primary text-primary'
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
