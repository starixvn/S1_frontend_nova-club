import Icon from 'app/components/Icon'
import { Pressable, View, styled } from 'dripsy'
import React, { useRef } from 'react'
import { useWindowDimensions } from 'react-native'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import { useGetRecoMatchQuery } from 'services/matchApi'
import MatchItem, { SCORE_HEIGHT } from './MatchItem'

type Props = {}
const ASPECT_RATIO = 3

export default function MatchSection({}: Props) {
  const { data } = useGetRecoMatchQuery()
  const width = useWindowDimensions().width
  const carouselWidth = Math.min(700, width * 0.8)
  const carouselRef = useRef<ICarouselInstance>(null)
  const height = carouselWidth / ASPECT_RATIO + SCORE_HEIGHT

  // const animationStyle = useCallback((value: number) => {
  //   'worklet'

  //   const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30])
  //   const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25])
  //   const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0])

  //   return {
  //     transform: [{ scale }],
  //     zIndex,
  //     opacity,
  //   }
  // }, [])

  if (!data) return <View sx={{ height }} />

  function next() {
    carouselRef?.current?.next()
  }

  function prev() {
    carouselRef?.current?.prev()
  }

  const isMultiple = data.length > 1

  return (
    <View
      sx={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        my: '$3',
      }}
    >
      {isMultiple && (
        <PaginationIconButton
          sx={{
            left: 0,
          }}
          onPress={prev}
        >
          <Icon name="search-no" />
        </PaginationIconButton>
      )}
      <Carousel
        autoPlay={isMultiple}
        ref={carouselRef}
        data={data}
        windowSize={1}
        renderItem={({ item }) => (
          <MatchItem match={item} width={carouselWidth} />
        )}
        width={width}
        height={carouselWidth / ASPECT_RATIO + SCORE_HEIGHT}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        // customAnimation={animationStyle}
      />
      {isMultiple && (
        <PaginationIconButton
          sx={{
            right: 0,
          }}
          onPress={next}
        >
          <Icon name="search-no" />
        </PaginationIconButton>
      )}
    </View>
  )
}

const PaginationIconButton = styled(Pressable)({
  position: 'absolute',
  width: '10%',
  right: 0,
  zIndex: 1,
  alignItems: 'center',
})
