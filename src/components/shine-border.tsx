import React from 'react'

import { cn } from '@/lib/utils'

export function ShineBorder(props: {
  children: React.ReactNode
  className?: React.ReactNode
}) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-700/70 via-transparent to-amber-700/70 p-[1px]">
      <div className="bg-gradient-border duration-8000 absolute -ml-2 h-full w-[150%] animate-spin from-transparent from-[21%] via-pink-600 via-[26%] to-transparent to-[27%]" />
      <div
        className={cn(
          'relative rounded-lg bg-background px-6 py-4',
          props.className,
        )}
      >
        {props.children}
      </div>
    </div>
  )
}
