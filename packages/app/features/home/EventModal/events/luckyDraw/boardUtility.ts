import { getSolitoImageSizes } from 'utils/common'
import random from 'lodash/random'
import sample from 'lodash/sample'
import { ComponentProps } from 'react'
import { MotiView } from 'moti'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

export type DiceResult = 1 | 2 | 3 | 4 | 5 | 6
export type DiceResults = Tuple<DiceResult, 2>

export const BG_RATIO = 765 / 583
export const CHAR_RATIO = 106 / 204
export const CONTENT_ITEM_SIZES = getSolitoImageSizes([64, 143])
export const BG_SIZES = getSolitoImageSizes([460, 612, 650])
export const SCALING_DEPTH = 0.2

export const STARTING_POSITION = {
  left: '52.5%',
  top: '81%',
}

export type BoardTile = ComponentProps<typeof MotiView> & {
  image: string
  offset: {
    left: string
    top: string
  }
}

export const REGISTRATION_TILES: BoardTile[] = [
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/vui123.png`,
    offset: {
      left: '61%',
      top: '66%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/10k.png`,
    offset: {
      left: '45%',
      top: '58%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/30k.png`,
    offset: {
      left: '30%',
      top: '51%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/iphone.png`,
    offset: {
      left: '15%',
      top: '44%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/50k.png`,
    offset: {
      left: '26%',
      top: '32%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/80k.png`,
    offset: {
      left: '36%',
      top: '21%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/random.png`,
    animate: {
      transform: [
        { scaleX: [1, { value: 0.7, delay: 500, type: 'spring' }, 1.1, 1] },
      ],
    },
    offset: {
      left: '45%',
      top: '11%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/300k.png`,

    offset: {
      left: '58%',
      top: '16%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/20coins.png`,

    offset: {
      left: '72%',
      top: '22%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/bomb.png`,
    animate: {
      scale: [1, 1.1, 1],
    },
    offset: {
      left: '87%',
      top: '28%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/800k.png`,

    offset: {
      left: '79%',
      top: '40%',
    },
  },
  {
    image: `${MEDIA_DOMAIN}${CONTENT_URI}/event/register/1t.png`,
    offset: {
      left: '70%',
      top: '53%',
    },
  },
]

export const POSITION_ANIMATION_CONFIG = {
  type: 'timing',
  duration: 300,
}

export const HALF_LENGTH = Math.floor(REGISTRATION_TILES.length * 0.5)

export function randomDiceResult(current: DiceResults): DiceResults {
  function getUniqueResult(prev) {
    let result
    do {
      result = random(1, 6)
    } while (result === prev)

    return result
  }

  return [getUniqueResult(current[0]), getUniqueResult(current[1])]
}

export function getZIndexByItemIndex(index: number, offset = 0) {
  return 10 - (HALF_LENGTH - Math.abs(HALF_LENGTH - index)) + offset
}

export function mapRollCodeToBoardIndex(code: number): number {
  switch (code) {
    case 0:
      return 9 // bomb
    case 1:
      return 1 // 10k
    case 2:
      return 2 // 30k
    case 3:
      return 4 // 50k
    case 4:
      return 5 // 80k
    case 7:
      return 7 // 300k
    case 8:
      return 10 // 800k
    case 9:
      return 11 // 1TR
    default:
      return 6 //Dummy Prize (Random icon), can be 5, 6
  }
}

export function resultToDiceArray(result: number): DiceResults {
  const total = Math.max(2, Math.min(12, result))

  let pool: DiceResults[] = []
  if (total < 8) {
    const dice1 = random(1, Math.min(6, total - 1)) as DiceResult
    pool.push([dice1, (total - dice1) as DiceResult])
  } else {
    const gap = 6 - (total - 6) + 1

    for (var i = 0; i < gap; i++) {
      const dice1 = (6 - i) as DiceResult
      pool.push([dice1, (total - dice1) as DiceResult])
    }
  }

  return sample(pool) as DiceResults
}
