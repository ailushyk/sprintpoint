import React from 'react'

import { cn } from '@/lib/utils'

export function ShineBorder(props: {
  children: React.ReactNode
  className?: React.ReactNode
}) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-700/70 via-transparent to-amber-700/70 p-[1px]">
      <div className="absolute -ml-2 h-full w-[150%] animate-spin bg-gradient-border from-transparent from-[21%] via-pink-600 via-[26%] to-transparent to-[27%] duration-8000" />
      <div className={cn('relative rounded-lg bg-background', props.className)}>
        {props.children}
      </div>
    </div>
  )
}
