import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormSubmit,
} from '@/components/ui/form'
import { PageHeader } from '@/components/page-header'
import { PageWrapper } from '@/components/page-wrapper'
import { TopBar } from '@/components/top-bar/top-bar'
import { UserNav } from '@/components/top-bar/user-nav'
import { startSessionAction } from '@/data/actions'
import { fetchAllDecks } from '@/data/deck-api'

export const metadata = {
  title: 'Start new session',
  description: 'Choose your deck and start a new session',
  alternates: {
    canonical: '/s',
  },
}

export default async function StartSessionPage() {
  const decks = await fetchAllDecks()
  return (
    <PageWrapper duration="mid">
      <TopBar>
        <UserNav />
      </TopBar>
      <main className="container grid">
        <PageHeader>Start new session</PageHeader>

        <Form action={startSessionAction}>
          <FormField name="deckId">
            <FormLabel>Deck</FormLabel>
            <FormDescription>
              Please select your deck to continue
            </FormDescription>
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
          </FormField>

          <div className="flex justify-end">
            <FormSubmit asChild>Next</FormSubmit>
          </div>
        </Form>
      </main>
    </PageWrapper>
  )
}
