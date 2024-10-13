import React from 'react'
import { cn } from '@/lib/utils'

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  duration?: 'fast' | 'mid' | 'slow'
  out?: boolean
}) => {
  return <div className={cn(className)}>{children}</div>
}
