import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Row, View, useResponsiveValue } from 'dripsy'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import GameGridSectionItem from './GameGridSectionItem'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { SocialMedia, getSocialMediaScheme } from 'app/constants/socialMedia'
import { Game } from 'services/gameApi.type'
import { useRouter } from 'solito/router'
import { SabaGamePayload } from 'app/constants/game'
import { store } from 'app/provider/redux/store'

export const SHAREHOLDER_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/agent-recruitment.mp4`
export const FISHING_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/fishing.mp4`
export const LOTTERY_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/keno.mp4`
export const GAME_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/games.mp4`
export const LIVE_CASINO_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/livecasino.mp4`
export const SPORT_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/sportsbook.mp4`
export const SLOT_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/slot.mp4`

export const SABA_PROMO_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/v2/videos/rebate.mp4`

const config = [
  {
    col: 4,
    src: SPORT_IMG,
    type: 'video',
    title: 'game.category.sportsbook',
    action: {
      type: ActionType.GAME,
      payload: {
        desktopMode: false,
        game: SabaGamePayload,
      },
    },
  },
  {
    col: 2,
    src: SHAREHOLDER_IMG,
    type: 'video',
    action: {
      type: ActionType.INTERNAL_REDIRECT,
      payload: {
        uri: store.getState().auth.info?.token ? '/agent' : '/auth/register',
        params: store.getState().auth.info?.token ? {} : { t: 'agent' },
      },
    },
  },
  {
    col: 3,
    src: SABA_PROMO_IMG,
    type: 'video',
    action: {
      type: ActionType.GAME,
      payload: {
        desktopMode: false,
        game: SabaGamePayload,
      },
    },
  },
  {
    col: 3,
    src: GAME_IMG,
    type: 'video',
    title: 'game.category.games',
    fallback: `${MEDIA_DOMAIN}${CONTENT_URI}/home/games.jpg`,
    action: {
      type: ActionType.INTERNAL_REDIRECT,
      payload: {
        uri: '/games/local',
      },
    },
  },
  {
    col: 3,
    src: SLOT_IMG,
    type: 'video',
    title: 'game.category.slots',
    fallback: `${MEDIA_DOMAIN}${CONTENT_URI}/home/sl.jpg`,
    action: {
      type: ActionType.INTERNAL_REDIRECT,
      payload: {
        uri: '/slots',
      },
    },
  },
  {
    col: 3,
    src: LIVE_CASINO_IMG,
    type: 'video',
    title: 'game.category.liveCasino',
    fallback: `${MEDIA_DOMAIN}${CONTENT_URI}/home/lc.jpg`,
    action: {
      type: ActionType.INTERNAL_REDIRECT,
      payload: {
        uri: '/livecasino',
      },
    },
  },
  {
    col: 3,
    src: LOTTERY_IMG,
    type: 'video',
    fallback: `${MEDIA_DOMAIN}${CONTENT_URI}/home/lt.jpg`,
    title: 'game.category.lottery',
    action: {
      type: ActionType.INTERNAL_REDIRECT,
      payload: {
        uri: '/games/keno-lottery',
      },
    },
  },
  {
    col: 3,
    src: FISHING_IMG,
    type: 'video',
    fallback: `${MEDIA_DOMAIN}${CONTENT_URI}/home/fishing.jpg`,
    title: 'game.category.fishing',
    action: {
      type: ActionType.INTERNAL_REDIRECT,
      payload: {
        uri: '/games/fishing',
      },
    },
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

  const widthPerColumn = Math.floor((1 / totalColumn) * innerWidth)

  const { push } = useRouter()

  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        p: outerPadding,
        justifyContent: 'center',
      }}
    >
      {config.map((c, i) => {
        const width = widthPerColumn * c.col
        const height = width / (c.col / 2)
        const isFallback = Platform.OS === 'android' && c.fallback
        return (
          <GameGridSectionItem
            key={i}
            sx={{
              width,
              height,
              p: itemSpace,
            }}
            type={isFallback ? 'image' : c.type}
            src={isFallback ? c.fallback : c.src}
            title={c.title}
            onPress={() => {
              getAction(c.action)({
                push,
              })
            }}
          />
        )
      })}
    </Row>
  )
}
