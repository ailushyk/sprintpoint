import React from 'react'

import { Button } from '../../../components/Button/Button'
import { TableType } from '../types'

export const TableControls = ({ table }: { table: TableType }) => {
  return (
    <div className="mb-8 flex flex-col items-center justify-center space-y-4">
      <Button
        onClick={() => {
          table.onCheck(true)
        }}
        dark
        disabled={table.checkout}
      >
        check
      </Button>
      <Button
        onClick={() => {
          table.onReset()
        }}
        disabled={!table.checkout}
      >
        reset
      </Button>
    </div>
  )
}
