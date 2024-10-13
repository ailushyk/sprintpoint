'use client'

import { scrollElementIntoView } from '@/lib/scroll-element-into-view'
import { Slot } from '@radix-ui/react-slot'
import React, { useRef } from 'react'

export const useAutoCenterOnFocus = () => {
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)

  const onFocus = () => {
    scrollElementIntoView({ element: ref?.current })
    // timeoutRef.current = window.setTimeout(() => {
    // }, 130) // Delay in milliseconds
  }

  const onBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  return { ref, onFocus, onBlur }
}

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
  const { ref, onFocus, onBlur } = useAutoCenterOnFocus()
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp ref={ref} onFocus={onFocus} onBlur={onBlur} {...props}>
      {children}
    </Comp>
  )
}
