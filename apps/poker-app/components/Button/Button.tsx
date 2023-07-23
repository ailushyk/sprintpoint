import React, { FC } from 'react'

import { cn } from '@easypoker/ui'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  dark?: boolean
  onClick?(): void
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  dark,
  onClick,
  ...restProps
}) => {
  return (
    <button
      className={cn([
        'h-12 w-64 border px-4 text-xl font-semibold uppercase active:pt-1 active:shadow-inner',
        className,
        {
          'bg-zinc-700 text-zinc-100 hover:bg-zinc-800': dark,
          'bg-zinc-100 text-zinc-800 hover:bg-zinc-200': !dark,
        },
        {
          'opacity-40': disabled,
        },
      ])}
      onClick={() => {
        if (!disabled && onClick) {
          return onClick()
        }
      }}
      {...restProps}
    >
      {children}
    </button>
  )
}
