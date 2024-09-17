import { fetchAllDecks } from '@/data/deck/deck-api'

export default async function RoomPage() {
  const data = await fetchAllDecks()
  return (
    <div>
      <h1>Room</h1>
      <p>Check the console for the data fetched from the API</p>
      <div>
        {data.map((deck) => (
          <div key={deck.slug}>
            <div>{deck.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
