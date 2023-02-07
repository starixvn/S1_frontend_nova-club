import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { GRID_TOTAL_COL, HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useOrientation from 'app/hooks/useOrientation'
import useLocalization from 'app/provider/localization'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { getSocialMediaScheme, SocialMedia } from 'app/utils/helper'
import { styled, View } from 'dripsy'
import React from 'react'
import { Game } from 'services/contentApi.type'
import { useRouter } from 'solito/router'
import GridSectionItem from './GridSectionItem'
export const SHAREHOLDER_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/shareholder.mp4?v=1`
export const FISHING_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/fishing.mp4?v=1`
export const LOTTERY_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/lottery.mp4?v=1`
export const GAME_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/game.mp4?v=1`
export const LIVE_CASINO_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/live-casino.mp4?v=1`
export const SPORT_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/sport.mp4?v=1`
export const SLOT_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/home/slot.mp4?v=1`

export const SABA_PROMO_IMG = `${MEDIA_DOMAIN}${CONTENT_URI}/videos/saba-sportsbook.mp4?v=1`
export const HOME_GRID = [
  {
    col: 4,
    src: { uri: SPORT_IMG },
    type: 'video',
    title: 'game.category.sportsbook',
    route: '/sportsbook',
  },
  {
    col: 2,
    src: { uri: SHAREHOLDER_IMG },
    type: 'video',
    action: {
      type: ActionType.EXTERNAL_REDIRECT,
      payload: {
        uri: getSocialMediaScheme(SocialMedia.ZALO).scheme,
      },
    },
  },
  {
    col: 3,
    src: { uri: SABA_PROMO_IMG },
    type: 'video',
    action: {
      type: ActionType.GAME,
      payload: {
        gc: '1',
        name: {
          en: 'SABA Sports',
          vi: 'SABA Sports',
        },
        gtc: 'sports',
        img: 'https://static.zzspeed.site/nvclub/sbe/cms/game/saba/sport-saba_1659947637.png',
        gpc: 'SABA',
      } as Game,
    },
  },
  {
    col: 3,
    src: { uri: GAME_IMG },
    type: 'video',
    title: 'game.category.games',
    route: '/games',
  },
  {
    col: 3,
    src: { uri: SLOT_IMG },
    type: 'video',
    title: 'game.category.slots',
    route: '/slot',
  },

  {
    col: 3,
    src: { uri: LIVE_CASINO_IMG },
    type: 'video',
    title: 'game.category.liveCasino',
    route: '/livecasino',
  },
  {
    col: 3,
    src: { uri: LOTTERY_IMG },
    type: 'video',
    title: 'game.category.keno/lottery',
    route: '/games',
    urlParam: {
      t: GAME_TYPE_CODE.LOTTERY,
    },
  },
  {
    col: 3,
    src: { uri: FISHING_IMG },
    type: 'video',
    title: 'game.category.fishing',
    route: '/games',
    urlParam: {
      t: GAME_TYPE_CODE.FISHING,
    },
  },
]

const GridSection = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const { orientation, isLandscape } = useOrientation()

  const { width } = useContainerDimension()
  const borderedWidth = width - 4
  const containerSpace = borderedWidth * HOME_PADDING
  const itemSpace = containerSpace * 0.33
  const columnWidth =
    (borderedWidth - containerSpace * 2 + itemSpace * 2) /
    (GRID_TOTAL_COL * (isLandscape ? 1.5 : 1))
  const rowHeight = columnWidth * 1.98

  const action = (data: typeof HOME_GRID[number]) => {
    if (data.action) {
      getAction(data.action)()
      return
    }

    if (data.urlParam) {
      push({
        pathname: data.route,
        query: data.urlParam,
      })
      return
    }

    push(data.route)
  }

  return (
    <StyledContainer
      sx={{
        px: containerSpace,
        py: itemSpace,
        mx: -itemSpace,
      }}
    >
      {HOME_GRID.map((j, index) => {
        const width = Math.floor(columnWidth * j.col)
        // const picHeight = rowHeight - itemSpace * 2
        // const checkTextSpace = picHeight / 70
        return (
          <GridSectionItem
            action={() => action(j)}
            rowHeight={rowHeight}
            itemSpace={itemSpace}
            type={j.type}
            itemSource={j.src}
            title={t(j.title)}
            key={index}
            width={width}
          />
        )
      })}
    </StyledContainer>
  )
}

const StyledContainer = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  borderWidth: 2,
  borderColor: 'transparent',
})

const StyledTextContainer = styled(View)({
  position: 'absolute',
  bg: '$secondary',
  alignItems: 'center',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
})

export default GridSection
