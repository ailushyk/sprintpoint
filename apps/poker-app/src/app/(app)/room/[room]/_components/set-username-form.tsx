'use client'

import React from 'react'
import { useFormState } from 'react-dom'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
} from '@/components/form'
import { getFormErrorByName } from '@/app/(settings)/profile/_components/profile-form'
import { updateUserProfileAction } from '@/app/actions'

export const SetUsernameForm = () => {
  const [state, formAction] = useFormState(updateUserProfileAction, {})
  let errors: any = null
  if (state.errors) {
    errors = JSON.parse(state.errors)
  }
  return (
    <Form action={formAction}>
      <FormField name="username">
        <FormLabel>Username</FormLabel>
        <FormControl asChild>
          <Input />
        </FormControl>
        {getFormErrorByName('username', errors) && (
          <FormMessage>
            {getFormErrorByName('username', errors)?.message}
          </FormMessage>
        )}
        <FormDescription>
          The username is used to identify you in the room.
        </FormDescription>
      </FormField>

      <div className="flex justify-end">
        <FormSubmit asChild>Save</FormSubmit>
      </div>
    </Form>
  )
}
