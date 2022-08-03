import home from 'app/config/home'
import { GRID_TOTAL_COL, HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { getAction } from 'app/utils/actionGenerator'
import { GAME_TYPE_CODE } from 'app/utils/constant'
import { Image, styled, Text, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'
const dummyData = [
  {
    col: 6,
    src: home[0]?.image,
    title: home[0]?.title,
    route: '/sportsbook',
  },
  {
    col: 3,
    src: home[1]?.image,
    title: home[1]?.title,
    route: '/games',
  },
  {
    col: 3,
    src: home[2]?.image,
    title: home[2]?.title,
    route: '/slot',
  },

  {
    col: 3,
    src: home[4]?.image,
    title: home[4]?.title,
    route: '/livecasino',
  },
  {
    col: 3,
    src: home[5]?.image,
    title: home[5]?.title,
    route: '/games',
    urlParam: {
      t: GAME_TYPE_CODE.LOTTERY,
    },
  },
  {
    col: 3,
    src: home[6]?.image,
    title: home[6]?.title,
    route: '/games',
    urlParam: {
      t: GAME_TYPE_CODE.FISHING,
    },
  },
  // {
  //   col: 3,
  //   src: home[7]?.image,
  //   title: home[7]?.title,
  //   action: {
  //     type: ActionType.GAME,
  //     payload: {
  //       game_provider_code: 'V8PK',
  //       game_name: 'game.category.poker',
  //       game_code: '0',
  //       game_type_code: 'LIVE_DEALER',
  //     },
  //   },
  // },
  {
    col: 3,
    src: home[3]?.image,
    title: home[3]?.title,
    route: '/games',
    urlParam: {
      t: GAME_TYPE_CODE.COCKFIGHTING,
    },
  },
]

const GridSection = () => {
  const { push } = useRouter()
  const { t } = useLocalization()
  const { width } = useContainerDimension()
  const borderedWidth = width - 4
  // const space = width * HOME_PADDING
  const quarterSpace = borderedWidth * HOME_PADDING * 0.25
  const thirdQuarterSpace = quarterSpace * 3
  const columnWidth = (borderedWidth - thirdQuarterSpace * 2) / GRID_TOTAL_COL
  const rowHeight = columnWidth * 1.98

  const action = (data: typeof dummyData[number]) => {
    if (data.action) {
      getAction(data.action)
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
        px: thirdQuarterSpace,
        py: quarterSpace,
      }}
    >
      {dummyData.map((j) => {
        const width = columnWidth * j.col
        const picHeight = rowHeight - quarterSpace * 2
        const checkTextSpace = picHeight / 30

        return (
          <BouncePressable
            key={j.src.toString()}
            sx={{
              p: quarterSpace,
              width,
              height: rowHeight,
            }}
            onPress={() => action(j)}
          >
            <Image
              sx={{
                width: width - quarterSpace * 2,
                height: rowHeight - quarterSpace * 2,
                borderRadius: 10,
              }}
              source={j.src}
              resizeMode="cover"
            />
            <StyledTextContainer
              sx={{
                bottom: checkTextSpace,
                left: checkTextSpace,
                width: width - quarterSpace * 2,
              }}
            >
              <Text
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: [14, 16],
                  pt: ['$1', '$2'],
                  pb: ['$1a', '$2a'],
                  textAlign: 'center',
                }}
              >
                {t(j.title)}
              </Text>
            </StyledTextContainer>
          </BouncePressable>
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
