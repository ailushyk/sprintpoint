'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, Icons, useTheme } from '@easypoker/ui'

const ThemeToggle = React.forwardRef<HTMLButtonElement>((props, ref) => {
  const { setTheme, theme } = useTheme()

  const isDark = theme === 'dark'
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative w-full justify-between px-2 text-sm font-normal"
    >
      <span className="">Theme</span>

      <AnimatePresence initial={false} mode="popLayout">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, x: 12, rotate: 30 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 12, rotate: 30 }}
            transition={{ duration: 0.7 }}
          >
            <Icons.moon />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, x: -12, rotate: -30 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -12, rotate: -30 }}
            transition={{ duration: 0.7 }}
          >
            <Icons.sun />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
})
ThemeToggle.displayName = 'ThemeToggle'

export { ThemeToggle }
