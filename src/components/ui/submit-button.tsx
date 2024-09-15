'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/Icon'
import React from 'react'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <Button size="lg" className="relative flex items-center justify-center">
      {pending && (
        <Icon.spinner className="absolute h-5 w-5 animate-spin text-muted-foreground" />
      )}
      <span className={pending ? 'invisible' : 'visible'}>{children}</span>
    </Button>
  )
}
