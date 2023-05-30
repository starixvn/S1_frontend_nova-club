import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Row, View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import GameGridSectionItem from './GameGridSectionItem'

export const SHAREHOLDER_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/agent-recruitment.mp4?v=2`
export const FISHING_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/fishing.mp4?v=1`
export const LOTTERY_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/lottery.mp4?v=1`
export const GAME_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/game.mp4?v=1`
export const LIVE_CASINO_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/live-casino.mp4?v=1`
export const SPORT_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/sport.mp4?v=1`
export const SLOT_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/slot.mp4?v=1`

export const SABA_PROMO_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/videos/saba-sportsbook.mp4?v=1`

const config = [
  {
    col: 4,
    src: SPORT_IMG,
    type: 'video',
    title: 'game.category.sportsbook',
  },
  {
    col: 2,
    src: SHAREHOLDER_IMG,
    type: 'video',
  },
  {
    col: 3,
    src: SABA_PROMO_IMG,
    type: 'video',
  },
  {
    col: 3,
    src: GAME_IMG,
    type: 'video',
    title: 'game.category.games',
  },
  {
    col: 3,
    src: SLOT_IMG,
    type: 'video',
    title: 'game.category.slots',
  },
  {
    col: 3,
    src: LIVE_CASINO_IMG,
    type: 'video',
    title: 'game.category.liveCasino',
  },
  {
    col: 3,
    src: LOTTERY_IMG,
    type: 'video',
    title: 'game.category.keno/lottery',
  },
  {
    col: 3,
    src: FISHING_IMG,
    type: 'video',
    title: 'game.category.fishing',
  },
]

export default function GameGridSection() {
  const outerWidth = useWindowDimensions().width
  const outerPaddingRatio = 0.03
  const totalColumn = useResponsiveValue([6, 6, 9])
  const spaceRatio = useResponsiveValue([0.012, 0.008])

  const itemSpace = spaceRatio * outerWidth
  const outerPadding = outerPaddingRatio * outerWidth
  const innerWidth = outerWidth - outerPadding * 2

  const widthPerColumn = (1 / totalColumn) * innerWidth

  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        p: outerPadding,
        // bg: 'red',
        justifyContent: 'center',
      }}
    >
      {config.map((c, i) => {
        const width = widthPerColumn * c.col
        const height = width / (c.col / 2)
        return (
          <GameGridSectionItem
            key={i}
            sx={{
              width,
              height,
              p: itemSpace,
            }}
            type={c.type}
            src={c.src}
            title={c.title}
          />
        )
      })}
    </Row>
  )
}
