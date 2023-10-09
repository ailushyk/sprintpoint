import React from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@easypoker/ui'

import { api } from '@/lib/api'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SubmitButton } from '@/components/submit-button'
import { createRoom } from '@/app/actions'

export const StartSession = async ({ children }: { children: string }) => {
  const [user, decks] = await Promise.all([api().user.get(), api().deck.all()])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">{children}</Button>
      </DialogTrigger>

      <DialogContent className="space-y-4 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Session</DialogTitle>
        </DialogHeader>

        <form action={createRoom} className="space-y-8">
          <fieldset className="flex flex-col gap-2">
            <input type="hidden" name="user" value={user?.id} />

            <Label htmlFor="deck">Deck</Label>
            <Select required name="deck">
              <SelectTrigger className="w-full" id="deck">
                <SelectValue placeholder="Select a deck" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {decks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id}>
                      {deck.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </fieldset>
          <SubmitButton>{children}</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}
