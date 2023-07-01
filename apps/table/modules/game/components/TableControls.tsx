import { TableType } from '../types'
import { Button } from '../../../components/Button/Button'
import React from 'react'

export const TableControls = ({ table }: { table: TableType }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mb-8">
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
