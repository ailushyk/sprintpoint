import React from 'react'

import { SubmitButton } from '@/components/submit-button'
import { createRoom } from '@/app/actions'

export const StartSession = ({ children }: { children: string }) => {
  return (
    <form action={createRoom}>
      <SubmitButton>{children}</SubmitButton>
    </form>
  )
}
