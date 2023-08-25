import { CMS_CONTENT_URI, CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useContainerWidth from 'app/hooks/useContainerWidth'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import {
  CarouselBannerActionType,
  getCarouselBannerActionGenerator,
} from 'app/utils/carouselBannerActionGenerator'
import {
  Pressable,
  Row,
  SxProp,
  View,
  useDripsyTheme,
  useResponsiveValue,
} from 'dripsy'
import React, { useCallback, useRef, useState } from 'react'
import { Linking, Platform, View as RNView } from 'react-native'
import { useModal } from 'react-native-modalfy'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Carousel, { TCarouselProps } from 'react-native-reanimated-carousel'
import { BannerItem, BannerResult } from 'services/contentApi.type'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'

export interface BannerCarouselProps
  extends Omit<TCarouselProps<BannerItem>, 'data' | 'renderItem'> {
  data?: BannerItem[]
  ratio?: number
  bannerType?: 'home' | 'slot'
  sx?: SxProp
}

interface BannerItemProps {
  item: BannerItem
  bannerUrl: string
  index: number
  width: number
  height: number
  disable: boolean
}

export default function BannerCarousel({
  data,
  bannerType = 'home',
  ratio = 1920 / 500,
  sx,
  ...rest
}: BannerCarouselProps) {
  // const width = useWindowDimensions().width
  const [disablePress, setDisablePress] = useState(false)

  const progressValue = useSharedValue<number>(0)
  const { theme } = useDripsyTheme()

  const rootRef = useRef<RNView>(null)

  const width = useContainerWidth(rootRef)

  // const ratio = 1920 / 500 //useResponsiveValue([2.688, 2.688, 2.688, 3.84])
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
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
            onBegan: () => setDisablePress(true),
            onEnded: () => setDisablePress(false),
          }}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ item, index }) => (
            <BannerCard
              item={item}
              bannerUrl={item.banner_url}
              index={index}
              height={height}
              width={width}
              disable={disablePress}
            />
          )}
          {...rest}
        />
      ) : null}
      {data && data.length > 0 && (
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

const BannerCard = ({
  item,
  bannerUrl,
  index,
  width,
  height,
  disable,
}: BannerItemProps) => {
  const { push } = useRouter()
  const { openModal } = useModal()
  const token = useAppSelector((s) => s.auth.info?.token)
  const isDesktop = useIsDesktop()
  const locale = useAppSelector((s) => s.setting.locale)

  const onPressCallback = useCallback(() => {
    if (Platform.OS !== 'web') return

    if (token) {
      if (item.banner_url?.startsWith('/')) {
        push(item.banner_url)
      } else {
        const bannerUrl = item.banner_url.startsWith('www')
          ? 'https://' + item.banner_url
          : item.banner_url

        Linking.openURL(bannerUrl)
      }
    } else {
      const bannerAction = {
        desktopType: CarouselBannerActionType.MODAL,
        type: CarouselBannerActionType.INTERNAL_REDIRECT,
        payload: {
          uri: '/auth/register',
          desktopUri: 'RegisterModal',
          params: {
            locale: 'vn',
          },
        },
      }

      const actionType = isDesktop
        ? bannerAction.desktopType
        : bannerAction.type

      const action = getCarouselBannerActionGenerator(
        bannerAction,
        isDesktop,
        actionType
      )
      action({ push, locale, openModal })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.banner_url, locale, token])

  return (
    <Pressable
      onPress={onPressCallback}
      disabled={Platform.OS === 'web' ? disable : false}
    >
      <View pointerEvents="none">
        <SolitoImage
          priority={index === 0}
          src={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${item.banner_image}`}
          // src={`https://bw88.io/2023/June/Bwing_BTI_250K_VN.jpg`}
          height={height}
          width={width}
          alt={item.alt ?? ''}
          contentFit="cover"
          // placeholder="blur"
          // blurDataURL={Platform.OS === 'web' ? item.blurDataURL : item.blurHash}
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
