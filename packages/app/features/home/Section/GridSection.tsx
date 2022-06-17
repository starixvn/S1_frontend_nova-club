import home from 'app/config/home'
import { GRID_TOTAL_COL, HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { Image, styled, View } from 'dripsy'
import React from 'react'
const dummyData = [
  {
    col: 4,
    src: home[0]?.image,
  },
  { col: 2, src: home[1]?.image },
  {
    col: 3,
    src: home[2]?.image,
  },
  { col: 3, src: home[3]?.image },
  {
    col: 2,
    src: home[4]?.image,
  },
  { col: 2, src: home[5]?.image },
  { col: 2, src: home[6]?.image },
]
const StyledImage = styled(Image)({
  borderRadius: 10,
})
const GridSection = () => {
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

        return (
          <View
            key={j.src.toString()}
            sx={{
              p: quarterSpace,
              width,
              height: rowHeight,
            }}
          >
            <StyledImage
              sx={{
                width: width - quarterSpace * 2,
                height: rowHeight - quarterSpace * 2,
              }}
              source={j.src}
              resizeMode="cover"
            />
          </View>
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

export default GridSection
