'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  toast,
} from '@easypoker/ui'

import { updateUserInfoAction } from '@/lib/actions'
import { UserProfileValues } from '@/lib/user/user'

const usernameFormSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .nonempty(),
})

export type UsernameFormValues = z.infer<typeof usernameFormSchema>

export const SetUsernameForm = ({
  defaultValues,
}: {
  defaultValues: UserProfileValues
}) => {
  let [isPending, startTransition] = useTransition()
  const form = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues,
  })

  const onSubmit = (data: UsernameFormValues) => {
    console.log('submit', data)
    startTransition(async () => {
      try {
        await updateUserInfoAction(data)

        form.reset()
        toast({
          title: 'Username saved!',
          description: 'You can change it anytime in the settings.',
        })
      } catch (error) {
        console.error(error)
        toast({
          title: 'Ups!',
          description: 'Something went wrong. Please try again later.',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The username is used to identify you in the room.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button type="submit" className="w-40">
            {isPending ? (
              <span className="text-muted flex items-center">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                <span>Saving...</span>
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
