import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormSubmit,
} from '@/components/ui/form'

const createRoom = async () => {
  'use server'
  console.log('TODO: createRoom')
}

export const StartSession = async ({ children }: { children: string }) => {
  const decks = [] // await api().deck.all()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" disabled>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Session</DialogTitle>
        </DialogHeader>

        <Form action={createRoom}>
          <FormField name="deck">
            <FormLabel>Deck</FormLabel>
            <FormControl asChild>
              <select
                required
                defaultValue=""
                className="flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option disabled>Select an option</option>
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
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
      </DialogContent>
    </Dialog>
  )
}
