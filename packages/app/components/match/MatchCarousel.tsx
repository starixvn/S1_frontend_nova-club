import { SabaGamePayload } from 'app/constants/game'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { Pressable, View, styled, useResponsiveValue } from 'dripsy'
import React, { forwardRef, useCallback, useRef } from 'react'
import { useWindowDimensions } from 'react-native'
import Carousel, {
  ICarouselInstance,
  TCarouselProps,
} from 'react-native-reanimated-carousel'
import { Game } from 'services/gameApi.type'
import { MatchResult } from 'services/matchApi.type'
import { mergeRefs } from 'utils/mergeRefs'
import Icon from '../Icon'
import MatchItem, { SCORE_HEIGHT } from './MatchItem'
import { logEvent } from 'app/integrations/analytic'
import { GAEvents } from 'app/integrations/analytic/events'
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
  gaEvent?: GAEvents
}

const MatchCarousel = forwardRef<ICarouselInstance, MatchCarouselProps>(
  ({ data, gaEvent, ...rest }: MatchCarouselProps, ref) => {
    const width = useWindowDimensions().width
    const resWidth = useResponsiveValue([500, 500, 500, 400, 400, 500])
    const itemWidth = Math.min(resWidth, width * 0.8)
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

    const isDesktop = useIsDesktop()

    const onPress = useCallback(
      (match: MatchResult) => {
        if (gaEvent)
          logEvent(gaEvent, {
            ref: match.EventId.toString(),
            display_name: `${match.HomeName} vs ${match.AwayName}`,
          })
        getAction({
          type: ActionType.GAME,
          payload: {
            desktopMode: isDesktop,
            game: {
              ...SabaGamePayload,
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
      <Root nativeID="match-section">
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
          width={itemWidth}
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
  overflow: 'hidden',
})
const PaginationIconButton = styled(Pressable)({
  position: 'absolute',
  width: '10%',
  right: 0,
  zIndex: 1,
  alignItems: 'center',
})
