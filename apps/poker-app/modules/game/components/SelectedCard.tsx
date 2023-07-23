import React, { useState } from 'react'

import { cn } from '@easypoker/ui'

interface Props {
  sp: number | null
  onClick?(state: string): void
}

export function SelectedCard({ sp, onClick }: Props) {
  const [state, setState] = useState('idle')
  const onAction = () => {
    const value = state === 'idle' ? 'hide' : state === 'hide' ? 'show' : 'idle'
    // const value = state === 'idle' ? 'hide' : 'idle'
    onClick?.(value)
    setState(value)
  }
  return (
    <button onClick={onAction}>
      <div
        className={cn([
          'flex h-24 w-24 items-center justify-center',
          'text-4xl font-semibold',
          'rounded transition',
          {
            'border-transparent bg-zinc-800 text-zinc-100': sp !== null,
            'border-2 border-zinc-200 bg-zinc-100 text-zinc-400': sp === null,
          },
        ])}
      >
        {state === 'hide' ? '?' : state === 'show' ? '!' : sp ?? '?'}
      </div>
    </button>
  )
}
