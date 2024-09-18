'use client'

import { Icon } from '@/components/ui/Icon'
import React from 'react'
import { useFormStatus } from 'react-dom'

export function FormButton({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  const { pending } = useFormStatus()
  return (
    <button className="relative" disabled={pending} {...props}>
      {pending && (
        <Icon.spinner className="absolute h-5 w-5 animate-spin text-muted-foreground" />
      )}
      <span className={pending ? 'invisible' : 'visible'}>{children}</span>
    </button>
  )
}
