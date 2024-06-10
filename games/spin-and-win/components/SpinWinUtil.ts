import sample from 'lodash/sample'
import { useEffect, useState } from 'react'
import { RedemptionResult } from 'services/rewardApi.type'

export interface Coordinate {
  x: number
  y: number
}

export interface PrizeInfo {
  isEmpty?: boolean
  prize: string
  img?: string
  amount: number
}

export const CENTER_ANCHOR = {
  // The Anchor Point is placed at the center of the sprite, else it will be at other location
  x: 0.5,
  y: 0.5,
}

export const GetPrizeList = () => {
  const array = Array.from({ length: 8 }, (_, index) => index).sort(
    () => Math.random() - 0.5
  )

  return array
}

enum PrizeType {
  FAIL = 0,
  '20K' = 1,
  '30K' = 2,
  '50K' = 3,
  '100K' = 4,
  '300K' = 5,
}

const Prizes: Record<keyof typeof PrizeType, PrizeInfo> = {
  FAIL: {
    isEmpty: true,
    prize: 'tryAgainDoubleLine',
    amount: 0,
  },
  '20K': {
    prize: '20K',
    img: 'prize-green',
    amount: 20000,
  },
  '30K': {
    prize: '30K',
    img: 'prize-blue',
    amount: 30000,
  },
  '50K': {
    prize: '50K',
    img: 'prize-red',
    amount: 50000,
  },
  '100K': {
    prize: '100K',
    img: 'prize-purple',
    amount: 100000,
  },
  '300K': {
    prize: '300K',
    img: 'prize-yellow',
    amount: 300000,
  },
}

export const PrizeList: PrizeInfo[] = [
  Prizes['100K'],
  Prizes.FAIL,
  Prizes['20K'],
  Prizes['300K'],
  Prizes['30K'],
  Prizes['20K'],
  Prizes.FAIL,
  Prizes['50K'],
]

export const EmptyIndexes: number[] = PrizeList.map((p, i) =>
  p.amount > 0 ? -1 : i
).filter((i) => i > -1)

export const useItemsLayout = (frameSize) => {
  const { width, height } = frameSize

  const posY = height / 2
  const posX = width / 2

  const [layoutItemPosition, setLayoutItemPosition] = useState<Coordinate[]>([])

  useEffect(() => {
    const cellWidth = width / 3.5

    const positions: Coordinate[] = []

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x = -cellWidth * (col - 1)
        const y = -cellWidth * (row - 1)

        positions.push({ x, y })
      }
    }

    // Change the sequence to make the frame animation later to move in rotation order, else it will be zigzag order
    const rearrangedArraySequence = [0, 1, 2, 5, 8, 7, 6, 3].map(
      (index) => positions[index] as Coordinate
    )

    setLayoutItemPosition(rearrangedArraySequence)
  }, [width, height, posX, posY])

  return layoutItemPosition
}

export function getRewardsIndex(result: RedemptionResult): number {
  const rewardAmount = Number(result.amount) ?? 0

  if (rewardAmount === 0 || isNaN(rewardAmount)) {
    if (EmptyIndexes.length > 0) {
      return sample(EmptyIndexes) as number
    } else {
      return -1
    }
  } else {
    return PrizeList.findIndex((p) => p.amount === rewardAmount)
  }
}
