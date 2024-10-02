import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
} from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { Input } from '@/components/ui/input'
import { fetchAllDecks } from '@/data/deck-api'
import { fetchSessionById } from '@/data/session-api'

interface PlayRoomPageProps {
  params: { room: string }
}

export async function generateMetadata({
  params,
}: PlayRoomPageProps): Promise<Metadata> {
  // read route params
  const room = params.room

  return {
    title: `Settings - ${room}`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
    alternates: {
      canonical: `/room/${room}/settings`,
    },
  }
}

export default async function CreateRoomPage({
  params,
}: {
  params: {
    sessionId: string
  }
}) {
  const { data } = await fetchSessionById(params.sessionId)
  const decks = await fetchAllDecks()
  return (
    <main className="container max-w-2xl flex-1 space-y-8 pt-8">
      <header>
        <h1 className="text-4xl font-bold">Room Settings</h1>
        <p>Coming Soon!</p>
      </header>

      <Form>
        <FormField name="id">
          <FormLabel>Room&apos;s name</FormLabel>
          <FormControl asChild disabled defaultValue={data.id}>
            <Input />
          </FormControl>
          <FormDescription>
            The name of the room is used to identify it. It can be anything you
            want.
          </FormDescription>
        </FormField>

        <FormField name="deckId">
          <FormLabel>Deck</FormLabel>
          <FormDescription>Please select your deck to continue</FormDescription>
          <FormControl asChild>
            <select
              required
              defaultValue=""
              className="flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option disabled>Select an option</option>
              {decks.data.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
            </select>
          </FormControl>
          <FormDescription>
            The deck is a set of cards that you will use to estimate the
            complexity of the tasks.
          </FormDescription>
          <FormDescription>
            Coming soon: custom decks and deck&apos;s settings.
          </FormDescription>
        </FormField>

        <div
          className="flex flex-col gap-6"
          // onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="text-right">
            <Button asChild className="w-32">
              <FormButton>Save</FormButton>
            </Button>
          </div>
        </div>
      </Form>
    </main>
  )
}
