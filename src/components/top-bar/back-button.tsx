'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/Icon'
import { useRouter } from 'next/navigation'

export const BackButton = () => {
  const router = useRouter()
  return (
    <Button variant="ghost" size="icon" onClick={router.back}>
      <Icon.arrowLeft className="h-6 w-6 text-muted-foreground" />
    </Button>
  )
}
