import { z } from 'zod'

import { userSchema } from './user'

export const roomStatusSchema = z
  .union([
    z.literal('idle'),
    z.literal('voting'), // set voting status after first vote
    z.literal('checking'),
    z.literal('finished'),
  ])
  .default('idle')
export type RoomStatus = z.infer<typeof roomStatusSchema>

const deckTypeSchema = z
  .union([z.literal('standard'), z.literal('t-shirts'), z.literal('custom')])
  .default('standard')
export type DeckType = z.infer<typeof deckTypeSchema>

const cardSchema = z.object({
  label: z.string(), // Etykieta karty (np. "2", "3", "5", "8", "?", "∞")
  value: z.string(), // Wartość karty (np. "2", "3", "5", "8", "?", "∞")
  score: z.number(), // Reprezentacja liczbowa karty
})

const cardDeckSchema = z.object({
  name: z.string(),
  cards: z.array(cardSchema),
  description: z.string().optional(),
})

/**
 * * Zadanie/Obszar/Ocena: Jeśli gra ma różne obszary lub rodzaje zadań do oceny, możesz przechowywać informacje o tym, które zadanie było oceniane i jakie było jego unikalne identyfikatory.
 * * Średnia: Możesz przechowywać średnią ocenę dla każdego zadania lub obszaru.
 * * Mediana: Możesz przechowywać medianę ocen dla każdego zadania lub obszaru.
 * * Rozkład Oceny: Możesz przechowywać histogram lub rozkład ocen w danej rundzie. To pozwala na zrozumienie, jak różnią się oceny między graczami.
 * * Odchylenie standardowe: Możesz przechowywać odchylenie standardowe ocen dla każdego zadania lub obszaru.
 * * Statystyki Graczy: Możesz przechowywać statystyki dla każdego gracza w danej rundzie, takie jak średnia ocena, liczba oddanych głosów, itp.
 */
const roundResultSchema = z.object({
  roundNumber: z.number(),
  result: cardSchema,
  startedAt: z.string().datetime({ offset: true }),
  endedAt: z.string().datetime({ offset: true }),
  deckType: deckTypeSchema,
  scores: z.array(
    z.object({
      userId: z.string(),
      card: cardSchema,
    })
  ),
  median: z.number(),
})

export const roomSchema = z.object({
  code: z.string(),
  name: z.string(),
  users: z.array(userSchema),
  status: roomStatusSchema,
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
  roundNumber: z.number(),
  maxPlayers: z.number().optional(),
  deckType: deckTypeSchema,
  roundResult: roundResultSchema.optional(),
})
export type Room = z.infer<typeof roomSchema>

interface ServerToClientEvents {
  joinedRoom: (data: { roomName: string }) => void
  leftRoom: (data: { roomName: string }) => void
  gameStarted: (data: { roomName: string }) => void
  revealVotes: (data: { roomName: string }) => void
  userVoted: (data: {
    roomName: string
    userId: string
    voteValue: number
  }) => void
  userInactive: (data: { userId: string; duration: number }) => void
  userLeftRoom: (data: { roomName: string; userId: string }) => void
  gameEnded: (data: { roomName: string }) => void
  disconnect: () => void
}

interface ClientToServerEvents {
  createRoom: (data: { roomName: string; userId: string }) => void
  joinRoom: (data: { roomName: string; userId: string }) => void
  leaveRoom: (data: { roomName: string; userId: string }) => void
  startGame: (data: { roomName: string }) => void
  submitVote: (data: {
    userId: string
    roomName: string
    voteValue: number
  }) => void
  resetVotes: (data: { roomName: string }) => void
}
