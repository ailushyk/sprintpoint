import { DeckCardType } from './deck'

export type TypeValue = 'risk' | 'complexity' | 'unfamiliar'

export interface DeckHook {
  sp: number | null
  deck: DeckCardType[]
  isActive(value: number, type?: TypeValue): boolean
  onSelect(value: number, type?: TypeValue): void
  resetDeck(): void
}

export interface PlayerType {
  username: string
  sp: number | null
}

export interface TableType {
  sp: number | null
  checkout: boolean
  players: PlayerType[]
  join(username: string): void
  onVote(player: PlayerType): void
  onCheck(value: boolean): void
  onReset(): void
}
