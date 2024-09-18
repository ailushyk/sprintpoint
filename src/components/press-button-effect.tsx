'use client'

import { pressVariants } from '@/lib/animation-variants'
import { motion, useAnimate } from 'framer-motion'
import React from 'react'

export const usePressAnimation = () => {
  const [scope, animate] = useAnimate()
  const handlePressDown = () => animate(scope.current, pressVariants.pressed)
  const handlePressUp = () => animate(scope.current, pressVariants.idle)
  return { scope, handlePressDown, handlePressUp }
}

export const PressButtonEffect = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { scope, handlePressDown, handlePressUp } = usePressAnimation()

  return (
    <motion.div
      ref={scope}
      variants={pressVariants}
      initial="out"
      animate="in"
      onMouseDownCapture={handlePressDown}
      onMouseUp={handlePressUp}
      onMouseLeave={handlePressUp}
      onTouchStart={handlePressDown}
      onTouchEnd={handlePressUp}
    >
      {children}
    </motion.div>
  )
}
PressButtonEffect.displayName = 'PressButton'
