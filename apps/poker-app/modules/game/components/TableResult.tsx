import React from 'react'
import { TableType } from '../types'

interface Props {
  table: TableType
}

export const TableResult = ({ table }: Props) => {
  return (
    <div className="text-xl">
      <div className="mb-2 font-semibold">Users:</div>
      <div>
        {table.players.map((player) => {
          if (player) {
            const { username, sp } = player
            return (
              <div key={username}>
                <span className="capitalize">{username}</span>:{' '}
                {table.checkout ? sp : sp ? '🟢' : '🔴'}
              </div>
            )
          }
          return null
        })}
      </div>
      <hr className="my-2" />
      <div>Suggest: {table.checkout ? table.sp : '🔴'}</div>
    </div>
  )
}
