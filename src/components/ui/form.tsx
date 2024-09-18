'use client'

import * as RadixForm from '@radix-ui/react-form'
import React, { forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import { FormButton } from '@/components/ui/form-button'
import { cn } from '@/lib/utils'

const Form = forwardRef<
  React.ElementRef<typeof RadixForm.Root>,
  React.ComponentPropsWithoutRef<typeof RadixForm.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadixForm.Root
      ref={ref}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    />
  )
})
Form.displayName = 'Form'

const FormField = forwardRef<
  React.ElementRef<typeof RadixForm.Field>,
  React.ComponentPropsWithoutRef<typeof RadixForm.Field>
>(({ className, ...props }, ref) => {
  return (
    <RadixForm.Field
      ref={ref}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
})
FormField.displayName = 'FormField'

const FormLabel = forwardRef<
  React.ElementRef<typeof RadixForm.Label>,
  React.ComponentPropsWithoutRef<typeof RadixForm.Label>
>(({ className, ...props }, ref) => {
  return (
    <RadixForm.Label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = RadixForm.Control
const FormMessage = forwardRef<
  React.ElementRef<typeof RadixForm.Message>,
  React.ComponentPropsWithoutRef<typeof RadixForm.Message>
>(({ className, ...props }, ref) => {
  return (
    <RadixForm.Message
      className={cn('text-sm text-red-400', className)}
      {...props}
    />
  )
})
FormMessage.displayName = 'FormMessage'

const FormSubmit = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixForm.Submit>) => {
  return (
    <RadixForm.Submit asChild className={cn('', className)}>
      <Button size="lg" asChild {...props}>
        <FormButton>{children}</FormButton>
      </Button>
    </RadixForm.Submit>
  )
}

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
}
