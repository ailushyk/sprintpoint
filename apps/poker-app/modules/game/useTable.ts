import { useEffect, useState } from 'react'

import { useEventBus } from '../eventBus/useEventBus'
import { calc } from './calc'
import { PlayerType, TableType } from './types'

export const useTable = (enable = false): TableType => {
  const { provider } = useEventBus()
  const [players, setPlayers] = useState<PlayerType[]>([])
  const [checkout, setCheckout] = useState<boolean>(false)

  const join = (username: string) => {
    provider.emit('multiplayer:join', username)
  }

  const onVote = (player: PlayerType) => {
    provider.emit('multiplayer:vote', player)
  }
  const onCheck = (value: boolean) => {
    provider.emit('multiplayer:check', value)
  }

  const onReset = () => {
    provider.emitLast('multiplayer:check', false)
  }

  useEffect(() => {
    if (enable) {
      provider.on<PlayerType[]>('multiplayer:result', (payload) => {
        setPlayers(payload!)
      })

      provider.on<boolean>('multiplayer:check', (value) => {
        setCheckout(value!)
      })
    }
    return () => {
      provider.off('multiplayer:result')
    }
  }, [enable])

  return {
    sp: calc(players),
    players,
    checkout,
    join,
    onVote,
    onCheck,
    onReset,
  }
}
