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
      <h2 className="mb-1 text-sm text-zinc-600 text-center font-semibold capitalize">
        {title}
      </h2>

      <div className="flex justify-center mb-2">
        <SelectedCard
          sp={sp}
          onClick={(value) => {
            setState(value)
          }}
        />
      </div>

      <div className="flex justify-center space-x-2 mb-4">
        <Toggle enabled={mode} onChange={setProMode} />
      </div>

      <div className="relative -mx-6 overflow-hidden">
        <div className="relative px-6 md:px-4 mx-auto ">
          {mode ? <ProDeck {...deck} /> : <EasyDeck {...deck} />}
        </div>
        <div
          className={cn([
            'absolute bg-zinc-100 inset-x-0 top-0 bottom-12 border transition',
            {
              'translate-x-0': state === 'hide',
              'translate-x-full': state === 'idle',
            },
          ])}
        >
          <div
            className={cn([
              'flex items-center justify-center w-full h-full text-9xl font-bold ',
              {
                'opacity-0': state === 'hide' || state === 'idle',
                'transition opacity-100': state === 'show',
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
