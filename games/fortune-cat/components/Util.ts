import { useEffect, useState } from 'react'
import { possibleResult } from './MeowBody'

export interface Coordinate {
  x: number
  y: number
}

export interface ItemLayout {
  prize: possibleResult
  position: Coordinate
}

export const useItemsLayout = ({ width, height, result = 0 }) => {
  // const { width, height } = frameSize

  const posY = height / 2
  const posX = width / 2

  const [layoutItemPosition, setLayoutItemPosition] = useState<ItemLayout[]>([])

  function handleSetReward(result) {
    if (!(result || result! >= 0)) return
    const randoms = []
    const frequencyCounter = {}
    const filteredArray = possibleResult.filter((value) => value !== result)

    for (let i = 0; i < 6; i++) {
      let randomNum = Math.floor(Math.random() * filteredArray.length)

      while (
        frequencyCounter[filteredArray[randomNum]] &&
        frequencyCounter[filteredArray[randomNum]] >= 2
      ) {
        randomNum = Math.floor(Math.random() * filteredArray.length)
      }

      randoms.push(filteredArray[randomNum])
      frequencyCounter[filteredArray[randomNum]] =
        (frequencyCounter[filteredArray[randomNum]] || 0) + 1
    }

    for (let i = 0; i < 3; i++) {
      randoms.push(result)
    }

    return shuffle(randoms)
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  useEffect(() => {
    let res
    if (result) res = handleSetReward(result)

    const cellWidth = width / 2

    const positions: Coordinate[] = []

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x = -cellWidth * (col - 1)
        const y = -cellWidth * (row - 1)

        positions.push({ x, y })
      }
    }

    // Change the sequence to make the frame animation later to move in rotation order, else it will be zigzag order
    const rearrangedArraySequence = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
      return result
        ? {
            prize: res[index],
            position: positions[index] as Coordinate,
          }
        : {
            position: positions[index] as Coordinate,
          }
    })

    setLayoutItemPosition(rearrangedArraySequence)
  }, [width, height, posX, posY, result])

  return layoutItemPosition
}
