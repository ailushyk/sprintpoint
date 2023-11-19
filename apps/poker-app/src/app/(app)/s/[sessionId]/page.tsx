import { notFound } from 'next/navigation'

import { Button } from '@easypoker/ui'

import { api } from '@/lib/api/api'
import { nextRound } from '@/app/actions'

export default async function SessionPage({ params }) {
  const gameSession = await api().session.get(params.sessionId)
  if (!gameSession) {
    notFound()
  }

  return (
    <div>
      <p>Welcome to session!</p>
      <p>Session id: {params.sessionId}</p>
      <div>
        <div>Round</div>
        <div>
          {gameSession.rounds.map((round) => (
            <div key={round.id}>
              <div>ID: {round.id}</div>
              <div>Status: {round.status}</div>
            </div>
          ))}
        </div>
      </div>
      <form
        action={async () => {
          'use server'
          const result = await nextRound(gameSession.id, {
            order: gameSession.rounds.length + 1,
          })
          console.log('result', result)
        }}
      >
        <Button>next round</Button>
      </form>
    </div>
  )
}
