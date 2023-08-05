import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Icons,
  Input,
  toast,
} from '@easypoker/ui'

import { updateUserInfoAction } from '@/lib/actions'
import { profileFormSchema, UserProfileValues } from '@/lib/user/user'

export const SetUsernameForm = ({
  defaultValues,
  afterSuccess,
}: {
  defaultValues: UserProfileValues
  afterSuccess: (data: UserProfileValues) => void
}) => {
  let [isPending, startTransition] = useTransition()
  const form = useForm<UserProfileValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  const onSubmit = (data: UserProfileValues) => {
    startTransition(() => {
      updateUserInfoAction(data)
        .then(() => {
          afterSuccess?.(data)

          toast({
            title: 'Username saved!',
            description: 'You can change it anytime in the settings.',
          })
        })
        .catch((err) => {
          console.error(err)
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
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
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
              <span className="flex items-center text-muted">
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
