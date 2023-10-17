'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

import { Button, Icons } from '@easypoker/ui'

export function SubmitButton({ children }) {
  const { pending } = useFormStatus()
  return (
    <Button size="lg" className="relative flex items-center justify-center">
      {pending && (
        <Icons.spinner className="absolute h-5 w-5 animate-spin text-muted-foreground" />
      )}
      <span className={pending ? 'invisible' : 'visible'}>{children}</span>
    </Button>
  )
}
