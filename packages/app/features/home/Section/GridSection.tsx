import home from 'app/config/home'
import { GRID_TOTAL_COL, HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { Image, styled, Text, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'
const dummyData = [
  {
    col: 4,
    src: home[0]?.image,
    title: home[0]?.title,
    route: '/sportsbook',
  },
  {
    col: 2,
    src: home[1]?.image,
    title: home[1]?.title,
    route: '/games',
  },
  {
    col: 2,
    src: home[2]?.image,
    title: home[2]?.title,
    route: '/slot',
  },

  {
    col: 2,
    src: home[4]?.image,
    title: home[4]?.title,
    route: '/livecasino',
  },
  {
    col: 2,
    src: home[5]?.image,
    title: home[5]?.title,
    route: '/games/lottery',
  },
  {
    col: 2,
    src: home[6]?.image,
    title: home[6]?.title,
    route: '/games/fishing',
  },
  {
    col: 2,
    src: home[7]?.image,
    title: home[7]?.title,
    action: {
      type: ActionType.GAME,
      payload: {
        game_provider_code: 'V8PK',
        game_name: 'game.category.poker',
        game_code: '0',
        game_type_code: 'LIVE_DEALER',
      },
    },
  },
  {
    col: 2,
    src: home[3]?.image,
    title: home[3]?.title,
    route: '/',
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
  const rowHeight = columnWidth * 2
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

        const action = j.action ? getAction(j.action) : () => push(j.route)
        return (
          <BouncePressable
            key={j.src.toString()}
            sx={{
              p: quarterSpace,
              width,
              height: rowHeight,
            }}
            onPress={action}
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
                  py: ['$1', '$2'],
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
