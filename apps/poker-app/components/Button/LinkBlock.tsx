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
        'flex justify-center items-center w-64 h-12 mb-4 px-4 active:pt-1',
        'text-xl font-semibold uppercase',
        'active:shadow-inner  border',
        {
          'text-zinc-100 bg-zinc-700 hover:bg-zinc-800': dark,
          'text-zinc-800 bg-zinc-100 hover:bg-zinc-200': !dark,
        },
        className,
      ])}
    >
      {children}
    </Link>
  )
}

export default LinkBlock
