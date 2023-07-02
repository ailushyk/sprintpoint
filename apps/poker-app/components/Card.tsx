import React, { FC } from 'react'
import { cn } from 'tailwind-config'

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
        'flex flex-shrink-0 justify-center items-center w-14 h-14 md:w-16 md:h-16',
        'text-2xl font-semibold cursor-pointer',
        ' rounded',
        'active:pt-1 active:shadow-inner shadow',
        'transition duration-100',
        {
          'text-zinc-100 bg-zinc-500': isActive,
          'text-zinc-900 bg-zinc-100 hover:bg-zinc-200': !isActive && !disabled,
          'text-zinc-100 bg-zinc-100 hover:bg-zinc-200': disabled && !isActive,
        },
      ])}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
