import { cn } from '@/lib/utils'
import React from 'react'

export const FadeInPageWrapper = ({
  children,
  className,
  duration = 'mid',
  out = false,
}: {
  children: React.ReactNode
  className?: string
  duration?: 'fast' | 'mid' | 'slow'
  out?: boolean
}) => {
  return (
    <div
      className={cn(
        'animate-in fade-in',
        {
          'duration-100': duration === 'fast',
          'duration-150': duration === 'mid',
          'duration-700': duration === 'slow',
          'animation-out fade-out': out,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
