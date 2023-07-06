import { Pressable, View, styled, useResponsiveValue } from 'dripsy'
import React, { forwardRef, useCallback, useRef } from 'react'
import { useWindowDimensions } from 'react-native'
import Carousel, {
  ICarouselInstance,
  TCarouselProps,
} from 'react-native-reanimated-carousel'
import Icon from '../Icon'
import MatchItem, { SCORE_HEIGHT } from './MatchItem'
import { MatchResult } from 'services/matchApi.type'
import { mergeRefs } from 'utils/mergeRefs'
import { AnimatePresence, MotiView } from 'moti'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { Game } from 'services/gameApi.type'
const ASPECT_RATIO = 3

export type MatchCarouselProps = Omit<
  TCarouselProps<MatchResult>,
  | 'renderItem'
  | 'width'
  | 'height'
  | 'autoPlay'
  | 'enabled'
  | 'panGestureHandlerProps'
  | 'windowSize'
  | 'data'
> & {
  data?: MatchResult[]
}

const MatchCarousel = forwardRef<ICarouselInstance, MatchCarouselProps>(
  ({ data, animationKey, ...rest }: MatchCarouselProps, ref) => {
    const width = useWindowDimensions().width
    const itemWidth = Math.min(500, width * 0.8)
    const carouselRef = useRef<ICarouselInstance>(null)

    const scoreHeight = useResponsiveValue(SCORE_HEIGHT)

    const mergedRef = mergeRefs([carouselRef, ref])
    const height = itemWidth / ASPECT_RATIO + scoreHeight

    function next() {
      carouselRef?.current?.next()
    }

    function prev() {
      carouselRef?.current?.prev()
    }

    const isDesktop = useResponsiveValue([false, false, false, true])

    const onPress = useCallback(
      (match: MatchResult) => {
        getAction({
          type: ActionType.GAME,
          payload: {
            desktopMode: isDesktop,
            game: {
              gc: '1',
              name: {
                en: 'SABA Sports',
                vi: 'SABA Sports',
              },
              gtc: 'sports',
              img: 'https://static-stage.gball8.com/nvclub/sbe/cms/game/saba/sport-saba_1659947637.png',
              gpc: 'SABA',
              tags: [],
              params: {
                leaguekey: match.LeagueId.toString(),
                matchid: match.EventId.toString(),
              },
            } as Game,
          },
        })()
      },
      [isDesktop]
    )

    if (!data) return <View sx={{ height }} />

    const isMultiple = data.length > 1

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

    return (
      <Root>
        {isMultiple && (
          <PaginationIconButton
            sx={{
              left: 0,
            }}
            onPress={prev}
          >
            <Icon name="back" />
          </PaginationIconButton>
        )}

        <Carousel
          // autoPlay={isMultiple}
          autoPlayInterval={5000}
          enabled={isMultiple}
          ref={mergedRef}
          data={data}
          windowSize={3}
          renderItem={({ item }) => (
            <MatchItem match={item} width={itemWidth} onPress={onPress} />
          )}
          width={width}
          height={height}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          {...rest}
        />

        {isMultiple && (
          <PaginationIconButton
            sx={{
              right: 0,
            }}
            onPress={next}
          >
            <Icon name="next" />
          </PaginationIconButton>
        )}
      </Root>
    )
  }
)

MatchCarousel.displayName = 'MatchCarousel'

export default MatchCarousel

const Root = styled(View)({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  mb: '$sectionBottomSpace',
})
const PaginationIconButton = styled(Pressable)({
  position: 'absolute',
  width: '10%',
  right: 0,
  zIndex: 1,
  alignItems: 'center',
})
