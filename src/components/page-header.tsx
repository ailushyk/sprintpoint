import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export function PageHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <header className={cn('py-8 text-4xl font-bold', className)}>
      <h1>{children}</h1>
    </header>
  )
}
