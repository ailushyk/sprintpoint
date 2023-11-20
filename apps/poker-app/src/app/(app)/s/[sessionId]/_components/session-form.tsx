'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { RoomValue } from '@easypoker/shared'
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@easypoker/ui'

const roomFormSchema = z.object({
  deck: z.string(),
})

export type RoomFormValues = z.infer<typeof roomFormSchema>

const defaultValues = {
  deck: 'standard',
}

export const SessionForm = ({ room }: { room?: RoomValue }) => {
  let [isPending, startTransition] = useTransition()
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: room || defaultValues,
  })

  const onSubmit = (data: RoomFormValues) => {
    console.log('submit session form')
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="deck"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Deck</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select deck" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="fibonacci">Fibonacci</SelectItem>
                  <SelectItem value="tshirt">T-Shirt</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The deck is a set of cards that you will use to estimate the
                complexity of the tasks.
              </FormDescription>
              <FormDescription>
                Coming soon: custom decks and deck&apos;s settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button type="submit" className="w-40">
            {isPending ? (
              <span className="flex items-center text-muted">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                <span>Creating...</span>
              </span>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
