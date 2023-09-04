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
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@easypoker/ui'

import { saveRoomAction } from '@/app/(app)/_components/room-actions'

const roomFormSchema = z.object({
  code: z.string().nonempty(),
  deck: z.string().nonempty(),
})

export type RoomFormValues = z.infer<typeof roomFormSchema>

const defaultValues = {
  code: '',
  deck: 'standard',
}

export const RoomForm = ({ room }: { room?: RoomValue }) => {
  let [isPending, startTransition] = useTransition()
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: room || defaultValues,
  })

  const onSubmit = (data: RoomFormValues) => {
    startTransition(() => {
      saveRoomAction(data)
        .then(() => {
          form.reset()
          toast({
            // title: 'Room saved',
            title: 'Coming soon!',
            description: 'Editing rooms is not available yet.',
          })
        })
        .catch(() => {
          toast({
            title: 'Ups!',
            description: 'Something went wrong. Please try again later.',
          })
        })
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Room&apos;s name</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormDescription>
                The name of the room is used to identify it. It can be anything
                you want.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
