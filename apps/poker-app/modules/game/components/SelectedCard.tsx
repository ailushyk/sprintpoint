import React, { useState } from 'react'
import { cn } from 'tailwind-config'

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
          'flex justify-center items-center w-24 h-24',
          'font-semibold text-4xl',
          'transition rounded',
          {
            'text-zinc-100 bg-zinc-800 border-transparent': sp !== null,
            'text-zinc-400 bg-zinc-100 border-2 border-zinc-200': sp === null,
          },
        ])}
      >
        {state === 'hide' ? '?' : state === 'show' ? '!' : sp ?? '?'}
      </div>
    </button>
  )
}
