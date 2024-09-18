'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/Icon'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'

export const BackButton = () => {
  const segments = useSelectedLayoutSegments()
  const router = useRouter()

  const handleClick = () => {
    segments.length > 0 ? router.back() : router.push('/dashboard')
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <Icon.arrowLeft className="h-6 w-6 text-muted-foreground" />
    </Button>
  )
}
