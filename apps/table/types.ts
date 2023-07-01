import { Dispatch, SetStateAction } from 'react'

type ResultValue = number | null

export interface AllResultsValue {
  risk: ResultValue
  complexity: ResultValue
  unfamiliar: ResultValue
}

export interface AuthValues {
  username: string
  password: string
}
export interface SignupValues extends AuthValues {
  displayName: string
}

export interface AuthValues {
  username: string
  password: string
}
