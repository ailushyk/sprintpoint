import React from 'react'

import { RoomStatusValue } from '@easypoker/shared'
import { Button } from '@easypoker/ui'

export function DeckFormActions(props: {
  status: RoomStatusValue
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-6">
      {props.status === 'checking' ? (
        <Button type="submit" className="w-40">
          Next vote
        </Button>
      ) : (
        <>
          <Button
            key="reset-action"
            type="reset"
            onClick={props.reset}
            variant="outline"
            className="w-40"
          >
            Reset
          </Button>

          <Button type="submit" className="w-40">
            Check
          </Button>
        </>
      )}
    </div>
  )
}
