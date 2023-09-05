'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { Button, Icons } from '@easypoker/ui'

export const BackButton = () => {
  const router = useRouter()

  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()}>
      <Icons.arrowLeft className="h-6 w-6 text-muted-foreground" />
    </Button>
  )
}
