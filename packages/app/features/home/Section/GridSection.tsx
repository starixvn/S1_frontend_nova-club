import home from 'app/config/home'
import { GRID_TOTAL_COL, HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
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
    col: 3,
    src: home[2]?.image,
    title: home[2]?.title,
    route: '/slot',
  },
  {
    col: 3,
    src: home[3]?.image,
    title: home[3]?.title,
    route: '/livecasino',
  },
  {
    col: 2,
    src: home[4]?.image,
    title: home[4]?.title,
    route: '/games/lottery',
  },
  {
    col: 2,
    src: home[5]?.image,
    title: home[5]?.title,
    route: '/games/fishing',
  },
  { col: 2, src: home[6]?.image, title: home[6]?.title, route: '/' },
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
        return (
          <BouncePressable
            key={j.src.toString()}
            sx={{
              p: quarterSpace,
              width,
              height: rowHeight,
            }}
            onPress={() => push(j.route)}
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
                  fontSize: [16, 18],
                  py: ['$2', '$3'],
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
  bg: 'rgba(0,0,0,0.5)',
  alignItems: 'center',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
})

export default GridSection
