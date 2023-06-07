import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Row, SxProp, View, useDripsyTheme } from 'dripsy'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useSharedValue,
} from 'react-native-reanimated'
import Carousel, { TCarouselProps } from 'react-native-reanimated-carousel'
import { BannerResult } from 'services/contentApi.type'
import { SolitoImage } from 'solito/image'

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
  const width = useWindowDimensions().width
  const height = width / (768 / 350)
  const progressValue = useSharedValue<number>(0)
  const { theme } = useDripsyTheme()

  return (
    <View sx={sx}>
      <Skeleton show={data == null}>
        <Carousel
          loop
          width={width}
          height={height}
          autoPlay={true}
          autoPlayInterval={5000}
          data={data}
          scrollAnimationDuration={1000}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item }) => (
            <SolitoImage
              src={`${MEDIA_DOMAIN}/${CONTENT_URI}/banners/${item.image}`}
              height={height}
              width={width}
              alt={item.alt ?? ''}
            />
          )}
          {...rest}
        />
      </Skeleton>
      {data && (
        <Row
          sx={{
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
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
