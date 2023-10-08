'use client'

import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import { Button, Icons } from '@easypoker/ui'

export function SubmitButton({ children }) {
  const { pending } = useFormStatus()
  return (
    <Button size="lg">
      {pending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
