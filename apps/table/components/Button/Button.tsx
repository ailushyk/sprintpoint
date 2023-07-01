import React, { FC } from 'react'
import { cn } from 'tailwind-config'

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
        'w-64 h-12 px-4 border active:pt-1 active:shadow-inner text-xl font-semibold uppercase',
        className,
        {
          'text-zinc-100 bg-zinc-700 hover:bg-zinc-800': dark,
          'text-zinc-800 bg-zinc-100 hover:bg-zinc-200': !dark,
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
