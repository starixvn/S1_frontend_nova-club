import { FlashList, FlashListProps } from '@shopify/flash-list'
import isDesktop from 'app/utils/isDesktop'
import { View } from 'dripsy'
import React, { useState } from 'react'

const scrollHeightPercent = 20
const scrollWidth = 6

const withCustomScroll = (WrappedComponent) => {
  const NewHocComponent = (props) => {
    const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 })
    const [contentSize, setContentSize] = useState(0)
    const [scrollViewHeight, setScrollViewHeight] = useState(0)

    const desktop = isDesktop()

    const scrollPerc =
      (contentOffset.y / (contentSize - scrollViewHeight)) *
      (100 - scrollHeightPercent)

    const handleScroll = (e) => {
      setContentOffset(e.nativeEvent.contentOffset)
    }

    const handleContentSizeChange = (_, height) => {
      setContentSize(height)
    }

    const handleLayout = (e) => {
      setScrollViewHeight(e.nativeEvent.layout.height)
    }
    return (
      <>
        <WrappedComponent
          {...props}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleLayout}
        />

        {desktop && (
          <View
            sx={{
              position: 'absolute',
              height: '100%',
              right: -(scrollWidth + 2),
              bg: '$primary.500',
              p: 1,
            }}
          >
            <View
              sx={{
                bg: '$primary.100',
                right: 0,
                width: scrollWidth,
                top: `${Number(scrollPerc || 0).toFixed(0)}%`,
                height: `${scrollHeightPercent}%`,
                zIndex: 4,
                borderRadius: 24,
              }}
            />
          </View>
        )}
      </>
    )
  }

  NewHocComponent.displayName = 'CompWithCustomScroll'
  return NewHocComponent
}

export const ScrollFlashList = withCustomScroll(FlashList) as <T>(
  props: FlashListProps<T>
) => React.ReactElement

export default withCustomScroll
