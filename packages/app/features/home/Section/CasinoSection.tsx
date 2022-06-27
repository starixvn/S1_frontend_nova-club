import { DraggableScrollView } from 'app/components/DraggableScrollView'
import casino from 'app/config/games/casino'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { Image, ScrollView, styled, View } from 'dripsy'
import React from 'react'
import SectionHeader from './SectionHeader'

const CasinoSection = () => {
  const { width, height } = useContainerDimension()

  const borderedWidth = width - 4
  const leftRightSpace = borderedWidth * HOME_PADDING * 0.75
  const columnWidth = (borderedWidth - leftRightSpace * 2) / 2.5
  const rowHeight = columnWidth * 1.35

  return (
    <View>
      <SectionHeader title={casino.label} bgColor={'maroon'} iconName={'lc'} />
      <DraggableScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: leftRightSpace,
        }}
      >
        {casino.gameList.map((i, index) => {
          return (
            <StyledImage
              key={i.image.toString() + index}
              source={i.image}
              sx={{
                width: columnWidth - leftRightSpace,
                height: rowHeight,
              }}
            />
          )
        })}
      </DraggableScrollView>
    </View>
  )
}

const StyledImage = styled(Image)({
  margin: '$2',
  borderRadius: 5,
})

export default CasinoSection
