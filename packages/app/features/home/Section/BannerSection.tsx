import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SkeletonPlaceholder from 'app/components/skeleton/SkeletonPlaceholder'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { useAppSelector } from 'app/provider/redux/store'
import { getAction } from 'app/utils/actionGenerator'
import { Image, styled, View } from 'dripsy'
import React, { FC, useCallback, useMemo } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { useBannerQuery } from 'services/contentApi'
import { BannerResult } from 'services/contentApi.type'
import { useRouter } from 'solito/router'

const BANNER_RATIO = 768 / 350

const BannerSection = () => {
  const { width, height } = useContainerDimension()

  const { data, isFetching } = useBannerQuery()

  const selectedColor = '#99ECFE'
  const progressValue = useSharedValue<number>(0)

  // if (Platform.OS === 'ios')
  return (
    <SkeletonPlaceholder show={isFetching} height={width / BANNER_RATIO}>
      {data && (
        <View>
          <Carousel
            data={data}
            width={width}
            height={width / BANNER_RATIO}
            pagingEnabled
            snapEnabled
            mode="parallax"
            autoPlay
            autoPlayInterval={3000}
            loop
            modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 1,
            }}
            onProgressChange={(_, absoluteProgress) =>
              (progressValue.value = absoluteProgress)
            }
            renderItem={BannerItem}
          />
          <StyledContainerPagination>
            {data.map((r, rindex) => {
              return (
                <PaginationItem
                  backgroundColor={selectedColor}
                  animValue={progressValue}
                  index={rindex}
                  key={rindex}
                  length={data.length}
                />
              )
            })}
          </StyledContainerPagination>
        </View>
      )}
    </SkeletonPlaceholder>
  )
}

const BannerItem = ({ item }: { item: BannerResult }) => {
  const { width } = useContainerDimension()
  const { image } = item
  const { push } = useRouter()
  const locale = useAppSelector((s) => s.setting.locale)
  const { makeContextualHref } = useContextualRouting()

  const onPressCallback = useCallback(() => {
    if (item.action) {
      const action = getAction(item.action)
      action({ push, locale, makeContextualHref })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.action, locale])
  return (
    <TouchableWithoutFeedback key={image} onPress={onPressCallback}>
      <Image
        source={{ uri: `${MEDIA_DOMAIN}${CONTENT_URI}/banners/${image}` }}
        resizeMode="cover"
        sx={{ width, height: width / BANNER_RATIO }}
      />
    </TouchableWithoutFeedback>
  )
}

const PaginationItem: FC<{
  index: number
  backgroundColor: string
  length: number
  animValue: Animated.SharedValue<number>
}> = (props) => {
  const { animValue, index, length, backgroundColor } = props
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
    <StyledBoxPagination>
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
    </StyledBoxPagination>
  )
}

const StyledContainerPagination = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignSelf: 'center',
  mt: '$2a',
  position: 'absolute',
  bottom: 10,
})

const StyledBoxPagination = styled(View)({
  width: 10,
  height: 10,
  m: '$1',
  bg: 'gray',
  borderRadius: 50,
  overflow: 'hidden',
})

export default BannerSection
