'use client'

import React from 'react'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'

import { Button, Icons } from '@easypoker/ui'

export const BackButton = () => {
  const segments = useSelectedLayoutSegments()
  console.log(segments.length)
  const router = useRouter()

  const handleClick = () => {
    segments.length > 0 ? router.back() : router.push('/dashboard')
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Icons.arrowLeft className="h-6 w-6 text-muted-foreground" />
    </Button>
  )
}
