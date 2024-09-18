import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import React, { forwardRef } from 'react'

export const PureCard = forwardRef<
  HTMLDivElement,
  {
    asChild?: boolean
  } & React.HTMLAttributes<HTMLDivElement>
>(({ children, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      ref={ref}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'flex h-[4.5rem] w-16 md:h-20 md:w-20',
        'select-none rounded-xl border-2 bg-card/90 p-4 text-xl transition',
        'data-[state=on]:border-primary data-[state=on]:bg-card',
        'group-data-[state=on]:border-primary',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
PureCard.displayName = 'PureCard'
