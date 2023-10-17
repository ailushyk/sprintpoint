import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'

import { Button, ButtonProps } from '@easypoker/ui'

import { flipVariants } from '@/lib/animation-variants'

export const FlipButton = forwardRef<HTMLButtonElement, ButtonProps>(
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
