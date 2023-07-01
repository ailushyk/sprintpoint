import { useMemo, useState } from 'react'
import { AllResultsValue } from '../../types'
import { DeckHook, TypeValue } from './types'
import { DeckScaleType, getDeck } from './deck'

const defaultState = {
  risk: null,
  complexity: null,
  unfamiliar: null,
}

export const useDeck = (deck?: DeckScaleType): DeckHook => {
  const [partialsSP, setPartialsSP] = useState<AllResultsValue>(defaultState)
  const deckValues = useMemo(() => {
    return getDeck(deck)
  }, [deck])

  const getValue = (type: TypeValue) => {
    const value = partialsSP[type]
    return value ?? 0
  }

  const calc = () => {
    if (Object.values(partialsSP).some((r) => r === null)) {
      return null
    } else {
      const average =
        (getValue('risk') + getValue('complexity') + getValue('unfamiliar')) / 3

      return deckValues.reduce((prev, current) => {
        return Math.abs(current - average) < Math.abs(prev - average)
          ? current
          : prev
      }, 0)
    }
  }

  const sp = calc()

  const isActive = (value: number, type?: TypeValue) => {
    if (type) {
      return partialsSP[type] === value
    }
    return sp === value
  }

  const onSelect = (value: number, type?: TypeValue) => {
    if (type) {
      setPartialsSP((prev) => ({
        ...prev,
        [type]: prev[type] === value ? null : value,
      }))
    } else {
      const t = value === sp ? null : value
      setPartialsSP({
        risk: t,
        complexity: t,
        unfamiliar: t,
      })
    }
  }

  const resetDeck = () => {
    setPartialsSP(defaultState)
  }

  return {
    sp,
    deck: deckValues,
    isActive,
    onSelect,
    resetDeck,
  }
}
