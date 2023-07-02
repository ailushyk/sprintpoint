import { useContext } from 'react'
import { EventBusContext } from './EventBusContext'

export const useEventBus = () => {
  const context = useContext(EventBusContext)
  if (!context) {
    throw new Error(
      'The "useEventBus" hook cannot be used outside of the Event Bus Provider',
    )
  }

  return context
}
