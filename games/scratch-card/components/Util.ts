import shuffle from 'lodash/shuffle'
import { useEffect, useState } from 'react'
import { possibleResult, prizeDict } from './GameBody'

export type Prize = keyof typeof prizeDict
export interface Coordinate {
  x: number
  y: number
}

export interface ItemLayout {
  prize: Prize
  position: Coordinate
}

type ItemLayoutProps = {
  width: number
  height: number
  result: Prize
}

export const useItemsLayout = ({
  width,
  height,
  result = 0,
}: ItemLayoutProps) => {
  const posY = height / 2
  const posX = width / 2

  const [layoutItemPosition, setLayoutItemPosition] = useState<ItemLayout[]>([])

  function handleSetReward(prize: Prize) {
    const resultArray: Prize[] = []
    const filteredResults = possibleResult.filter(
      (value) => value !== result
    ) as Prize[]

    resultArray.push(prize, prize, prize)
    resultArray.push(...filteredResults)

    return shuffle(resultArray)
  }

  function generate3x3Position() {
    const cellWidth = width / 3

    const positions: Coordinate[] = []

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x = -cellWidth * (col - 1)
        const y = -cellWidth * (row - 1)

        positions.push({ x, y })
      }
    }
    return positions
  }

  useEffect(() => {
    if (result !== undefined) {
      const res = handleSetReward(result)
      const positions = generate3x3Position()

      // Change the sequence to make the frame animation later to move in rotation order, else it will be zigzag order
      const rearrangedArraySequence = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
        (index) => {
          return {
            prize: res[index] as Prize,
            position: positions[index] as Coordinate,
          }
        }
      )

      setLayoutItemPosition(rearrangedArraySequence)
    }
  }, [width, height, posX, posY, result])

  return layoutItemPosition
}
