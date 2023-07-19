'use client'

import React from 'react'
import { Button, Icons, useTheme } from '@easypoker/ui'
import { AnimatePresence, motion } from 'framer-motion'

const ThemeToggle = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>((props, ref) => {
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
            initial={{ opacity: 0, x: 12, y: 4, rotate: 45 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 12, y: 4, rotate: 45 }}
            transition={{ duration: 0.7 }}
          >
            <Icons.moon />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, x: -12, y: 4, rotate: -45 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -12, y: 4, rotate: -45 }}
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
