import { useTick } from '@pixi/react'
import { useState } from 'react'

type AnimateNumberOptions = {
  tickPerSecond: number
}

export default function useAnimatedNumber(
  balance: number | undefined,
  options: AnimateNumberOptions
) {
  const [animatingBalance, setAnimatingBalance] = useState(balance)
  const balanceDisplay = animatingBalance ? Math.floor(animatingBalance) : 0

  const { tickPerSecond = 1 } = options

  useTick((delta) => {
    if (balance != null) {
      if (animatingBalance != null) {
        if (Math.abs(animatingBalance - balance) !== tickPerSecond)
          setAnimatingBalance((p: number) => {
            if (p > balance) {
              return Math.max(p - delta * tickPerSecond, balance)
            } else return Math.min(p + delta * tickPerSecond, balance)
          })
        else {
          setAnimatingBalance(balance)
        }
      } else {
        setAnimatingBalance(balance)
      }
    }
  }, balance != null && balance != animatingBalance)

  return balanceDisplay
}
