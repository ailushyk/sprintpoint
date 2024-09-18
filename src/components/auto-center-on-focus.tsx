'use client'

import { Slot } from '@radix-ui/react-slot'
import React, { useRef } from 'react'

/**
 * This component will scroll to the center of the container when it receives focus.
 *
 * **WARNING**: This component is not working as expected with the PressButtonEffect
 */
export const AutoCenterOnFocus = ({
  children,
  asChild,
  ...props
}: {
  children: React.ReactNode
  asChild?: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const Comp = asChild ? Slot : 'div'
  const timeoutRef = useRef<number | null>(null)

  const onFocus = () => {
    timeoutRef.current = window.setTimeout(() => {
      ref?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // Scroll to the center of the container
        inline: 'center', // Scroll to the horizontal center of the container
      })
    }, 130) // Delay in milliseconds
  }

  const onBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  return (
    <Comp ref={ref} onFocus={onFocus} onBlur={onBlur} {...props}>
      {children}
    </Comp>
  )
}
