import React, { useState } from 'react'

import { cn } from '@easypoker/ui'

import { Toggle } from '@/components/Toggle'

import { DeckHook } from '../types'
import { usePlayer } from '../usePlayer'
import { EasyDeck } from './EasyDeck'
import { ProDeck } from './ProDeck'
import { SelectedCard } from './SelectedCard'

interface Props extends Omit<DeckHook, 'resetDeck'> {
  title: string
  disabled?: boolean
}

const PlayTable = ({ title, sp, ...deck }: Props) => {
  const { data, setPlayer } = usePlayer()
  const [mode, setMode] = useState(() => data.proMode!)
  const [state, setState] = useState('idle')

  const setProMode = (value: boolean) => {
    setMode(value)
    setPlayer({ ...data, proMode: value })
  }

  return (
    <div>
      <h2 className="mb-1 text-center text-sm font-semibold capitalize text-zinc-600">
        {title}
      </h2>

      <div className="mb-2 flex justify-center">
        <SelectedCard
          sp={sp}
          onClick={(value) => {
            setState(value)
          }}
        />
      </div>

      <div className="mb-4 flex justify-center space-x-2">
        <Toggle enabled={mode} onChange={setProMode} />
      </div>

      <div className="relative -mx-6 overflow-hidden">
        <div className="relative mx-auto px-6 md:px-4 ">
          {mode ? <ProDeck {...deck} /> : <EasyDeck {...deck} />}
        </div>
        <div
          className={cn([
            'absolute inset-x-0 bottom-12 top-0 border bg-zinc-100 transition',
            {
              'translate-x-0': state === 'hide',
              'translate-x-full': state === 'idle',
            },
          ])}
        >
          <div
            className={cn([
              'flex h-full w-full items-center justify-center text-9xl font-bold ',
              {
                'opacity-0': state === 'hide' || state === 'idle',
                'opacity-100 transition': state === 'show',
              },
            ])}
          >
            {sp ?? '?'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayTable
