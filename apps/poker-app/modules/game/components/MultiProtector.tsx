import React from 'react'
import { Navigate } from 'react-router-dom'

import { usePlayer } from '../usePlayer'

const MultiProtector = ({ children }: { children: JSX.Element }) => {
  const { data } = usePlayer()

  if (!data.username) {
    return <Navigate to="/play/multi/join" replace />
  }

  return children
}

export default MultiProtector
