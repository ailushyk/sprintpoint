import React from 'react'

import { cn } from '@easypoker/ui'

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ children, className }, ref) => {
    return (
      <span
        className={cn(
          // 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text px-2 text-transparent dark:from-orange-400 dark:to-amber-500',
          'bg-gradient-to-l from-fuchsia-600 via-red-500 to-amber-500 bg-clip-text px-2 text-transparent',
          // 'bg-gradient-to-l from-amber-500 to-orange-500 bg-clip-text px-2 text-transparent',
          // 'bg-gradient-to-l from-fuchsia-500 to-orange-500 bg-clip-text px-2 text-transparent',
          // 'via-cian-600 bg-gradient-to-l from-red-500 via-indigo-600 to-orange-500 bg-clip-text px-2 text-transparent',
          className
        )}
        ref={ref}
      >
        {children}
      </span>
    )
  }
)
GradientText.displayName = 'GradientText'

export { GradientText }
