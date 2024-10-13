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
        'select-none rounded-xl border-2 bg-card p-4 text-xl transition',
        '[mask:radial-gradient(black_37%,transparent)]',
        'text-muted-foreground hover:border-primary hover:[mask:radial-gradient(black_27%,transparent_98%)] focus:border-primary focus:bg-accent',
        'data-[state=on]:border-primary data-[state=on]:bg-destructive data-[state=on]:text-2xl data-[state=on]:text-foreground data-[state=on]:[mask:radial-gradient(black_44%,transparent)] md:data-[state=on]:text-3xl',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
PureCard.displayName = 'PureCard'
