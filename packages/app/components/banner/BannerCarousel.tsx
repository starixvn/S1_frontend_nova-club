import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerWidth from 'app/hooks/useContainerWidth'
import { Row, SxProp, View, useDripsyTheme } from 'dripsy'
import React, { useCallback, useRef } from 'react'
import { Platform, View as RNView } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Carousel, { TCarouselProps } from 'react-native-reanimated-carousel'
import { BannerResult } from 'services/contentApi.type'
import { SolitoImage } from 'solito/image'
import SkeletonPlaceholder from '../SkeletonPlaceholder'
import { Pressable } from 'dripsy'
import { getAction } from 'app/utils/actionGenerator'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'solito/router'

export interface BannerCarouselProps
  extends Omit<TCarouselProps<BannerResult>, 'data' | 'renderItem'> {
  data?: BannerResult[]
  sx?: SxProp
}

export default function BannerCarousel({
  data,
  sx,
  ...rest
}: BannerCarouselProps) {
  // const width = useWindowDimensions().width

  const progressValue = useSharedValue<number>(0)
  const { theme } = useDripsyTheme()

  const rootRef = useRef<RNView>(null)

  const width = useContainerWidth(rootRef)

  const ratio = 1920 / 500 //useResponsiveValue([2.688, 2.688, 2.688, 3.84])
  const height = width / ratio

  const showCarousel = data != null && width > 0

  return (
    <View
      ref={rootRef}
      sx={{
        width: '100%',
        aspectRatio: ratio,
        flexDirection: 'row',
        alignItems: 'stretch', // for App to be able to use height 100% on skeleton
        ...sx,
      }}
    >
      {/* <Text>{width + ' ' + height}</Text> */}
      {showCarousel ? (
        <Carousel
          loop
          windowSize={3}
          width={width}
          height={height}
          autoPlay
          autoPlayInterval={5000}
          data={data}
          scrollAnimationDuration={1000}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item, index }) => (
            <BannerItem
              item={item}
              index={index}
              height={height}
              width={width}
            />
          )}
          {...rest}
        />
      ) : null}
      {data && (
        <Row
          sx={{
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {data.map((b, index) => {
            return (
              <PaginationItem
                backgroundColor={theme.colors.$tertiary}
                animValue={progressValue}
                index={index}
                key={index}
                // isRotate
                length={data.length}
              />
            )
          })}
        </Row>
      )}
    </View>
  )
}

const BannerItem = ({ item, index, width, height }) => {
  const { push } = useRouter()
  const locale = useAppSelector((s) => s.setting.locale)

  const onPressCallback = useCallback(() => {
    console.log('click item', item)
    if (item.action) {
      const action = getAction(item.action)
      action({ push, locale })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.action, locale])

  return (
    <Pressable onPress={onPressCallback}>
      <View pointerEvents="none">
        <SolitoImage
          priority={index === 0}
          src={`${MEDIA_DOMAIN}/${CONTENT_URI}/v2/banners/${item.image}`}
          // src={`https://bw88.io/2023/June/Bwing_BTI_250K_VN.jpg`}
          height={height}
          width={width}
          alt={item.alt ?? ''}
          contentFit="cover"
          placeholder="blur"
          blurDataURL={Platform.OS === 'web' ? item.blurDataURL : item.blurHash}
        />
      </View>
    </Pressable>
  )
}

const PaginationItem: React.FC<{
  index: number
  backgroundColor: string
  length: number
  animValue: Animated.SharedValue<number>
  isRotate?: boolean
}> = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props
  const width = 10

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1]
    let outputRange = [-width, 0, width]

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1]
      outputRange = [-width, 0, width]
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    }
  }, [animValue, index, length])
  return (
    <View
      style={{
        backgroundColor: '#808080',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  )
}
