'use client'

import PlayTable from '@/modules/game/components/PlayTable'
import { useDeck } from '@/modules/game/useDeck'
import { usePlayer } from '@/modules/game/usePlayer'

export default function SinglePage() {
  const { data } = usePlayer()
  const deck = useDeck(data?.deck)

  return <PlayTable title="Single player" {...deck} />
}
