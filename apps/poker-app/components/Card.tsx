import React, { FC } from 'react'

import { cn } from '@easypoker/ui'

interface CardProps {
  children: string
  isActive: boolean
  disabled?: boolean
  onClick(): void
}

export const Card: FC<CardProps> = ({
  children,
  isActive,
  disabled,
  onClick,
}) => {
  return (
    <div
      className={cn([
        'flex h-14 w-14 flex-shrink-0 items-center justify-center md:h-16 md:w-16',
        'cursor-pointer text-2xl font-semibold',
        ' rounded',
        'shadow active:pt-1 active:shadow-inner',
        'transition duration-100',
        {
          'bg-zinc-500 text-zinc-100': isActive,
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-200': !isActive && !disabled,
          'bg-zinc-100 text-zinc-100 hover:bg-zinc-200': disabled && !isActive,
        },
      ])}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
