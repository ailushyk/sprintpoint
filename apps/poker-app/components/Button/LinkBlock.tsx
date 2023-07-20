import React from 'react'
import Link from 'next/link'
import { cn } from '@easypoker/ui'

interface Props {
  children: React.ReactNode
  to: string
  className?: string
  dark?: boolean
}

function LinkBlock({ to, className, children, dark = false }: Props) {
  return (
    <Link
      href={to}
      className={cn([
        'mb-4 flex h-12 w-64 items-center justify-center px-4 active:pt-1',
        'text-xl font-semibold uppercase',
        'border  active:shadow-inner',
        {
          'bg-zinc-700 text-zinc-100 hover:bg-zinc-800': dark,
          'bg-zinc-100 text-zinc-800 hover:bg-zinc-200': !dark,
        },
        className,
      ])}
    >
      {children}
    </Link>
  )
}

export default LinkBlock
