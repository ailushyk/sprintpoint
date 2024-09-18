import { startSessionAction } from '@/app/actions'
import { AppHeader } from '@/components/app-header/app-header'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormSubmit,
} from '@/components/ui/form'
import { fetchAllDecks } from '@/data/deck/deck-api'

export default async function RoomPage() {
  const decks = await fetchAllDecks()
  return (
    <div>
      <AppHeader />
      <h1>Room</h1>
      <p>Check the console for the data fetched from the API</p>
      <div>
        {decks.data.map((deck) => (
          <div key={deck.slug}>
            <div>{deck.name}</div>
          </div>
        ))}
      </div>

      <Form action={startSessionAction}>
        <FormField name="deck">
          <FormLabel>Deck</FormLabel>
          <FormControl asChild>
            <select
              required
              defaultValue=""
              className="flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option disabled>Select an option</option>
              {decks.data.map((deck) => (
                <option key={deck.slug} value={deck.slug}>
                  {deck.name}
                </option>
              ))}
            </select>
          </FormControl>
        </FormField>

        <div className="flex justify-end">
          <FormSubmit asChild>Start</FormSubmit>
        </div>
      </Form>
    </div>
  )
}
