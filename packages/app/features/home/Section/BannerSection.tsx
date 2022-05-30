import { LANGUAGE_CODE } from 'app/constant/language'
import { useBannerQuery } from 'app/services/contentApi'
import { BannerResult } from 'app/services/contentApi.type'
import { Image, styled, View } from 'dripsy'
import React, { FC } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
const BANNER_RATIO = 434 / 163

const BannerSection = () => {
  const { width, height } = useWindowDimensions()

  const { data } = useBannerQuery(LANGUAGE_CODE.VIETNAM)
  const selectedColor = '#99ECFE'
  const colors = [selectedColor, selectedColor]
  const progressValue = useSharedValue<number>(0)

  return (
    <View>
      {data && (
        <View>
          <Carousel
            data={data.data}
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
          <StyledContainerPaginatiom>
            {colors.map((r, rindex) => {
              return (
                <PaginationItem
                  backgroundColor={r}
                  animValue={progressValue}
                  index={rindex}
                  key={rindex}
                  length={colors.length}
                />
              )
            })}
          </StyledContainerPaginatiom>
        </View>
      )}
    </View>
  )
}

const BannerItem = ({ item }: { item: BannerResult }) => {
  const { width } = useWindowDimensions()
  const { bannerMobileUrl } = item
  return (
    <View key={bannerMobileUrl}>
      <Image
        source={{ uri: bannerMobileUrl }}
        resizeMode="cover"
        sx={{ width, height: width / BANNER_RATIO }}
      />
    </View>
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
    <StyledBoxPaginatiom>
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
    </StyledBoxPaginatiom>
  )
}

const StyledContainerPaginatiom = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 30,
  alignSelf: 'center',
  mt: '$5',
  position: 'absolute',
  bottom: 10,
})

const StyledBoxPaginatiom = styled(View)({
  width: 10,
  height: 10,
  bg: 'gray',
  borderRadius: 50,
  overflow: 'hidden',
})

export default BannerSection
