import { useTick } from '@pixi/react'
import { useState } from 'react'
import useAnimatedNumber from './useAnimatedNumber'

type AnimateNumberOptions = {
  tickPerSecond: number
}

export default function useAnimatedAmount(
  balance = 0,
  options: AnimateNumberOptions
) {
  const amount = useAnimatedNumber(balance, options)

  return (
    Math.floor(amount / 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'K'
  )
}
