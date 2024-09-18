import { Button, ButtonProps } from '@/components/ui/button'
import { pressVariants } from '@/lib/animation-variants'
import { motion, useAnimate } from 'framer-motion'
import { forwardRef } from 'react'

export const PressButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const [scope, animate] = useAnimate()

    const handlePressDown = () => {
      animate(scope.current, pressVariants.pressed)
    }
    const handlePressUp = () => {
      animate(scope.current, pressVariants.idle)
    }

    return (
      <div className="rounded-md bg-background">
        <motion.div
          ref={scope}
          variants={pressVariants}
          initial="out"
          animate="in"
        >
          <Button
            ref={ref}
            onMouseDownCapture={handlePressDown}
            onMouseUp={handlePressUp}
            onMouseLeave={handlePressUp}
            onTouchStart={handlePressDown}
            onTouchEnd={handlePressUp}
            {...props}
          >
            {children}
          </Button>
        </motion.div>
      </div>
    )
  },
)
PressButton.displayName = 'PressButton'
