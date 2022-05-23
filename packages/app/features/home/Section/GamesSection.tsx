import fishing from 'app/config/games/fishing'
import hotgame from 'app/config/games/hotgame'
import lottery from 'app/config/games/lottery'
import { Image, Pressable, styled, Text, View } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import SectionHeader from './SectionHeader'

const GamesSection = () => {
  const data = [fishing, lottery, hotgame]
  const { width, height } = useWindowDimensions()

  const StyledImage = styled(Image)({
    mx: '$3',
    borderRadius: 5,
    height: [160, 250, 330],
    width: [width / 2.6, width / 2.5, width / 2.3],
  })

  const StyledCarousel = styled(Carousel)({
    height: [height * 0.6, height * 0.8, height],
  })

  const selectedColor = 'rgb(65,64,95)'
  const colors = [selectedColor, selectedColor, selectedColor]
  const progressValue = useSharedValue<number>(0)

  return (
    <View>
      <SectionHeader title={'GAMES'} bgColor="green" iconName="games" />
      <StyledCarousel
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        loop={false}
        width={width}
        data={data}
        pagingEnabled
        snapEnabled
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 60,
          parallaxAdjacentItemScale: 0.92,
        }}
        renderItem={({ item, index }) => {
          const img = item.gameList.slice(0, 6)
          return (
            <StyledContainer key={item.label}>
              <StyledLabel>
                <StyledTitle>{item.label}</StyledTitle>
                <Pressable>
                  <StyledMore>{`>`}</StyledMore>
                </Pressable>
              </StyledLabel>
              <View
                sx={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {img.map((r, rindex) => {
                  return (
                    <View style={{ marginHorizontal: 3 }} key={rindex}>
                      <StyledImage source={r.image} />
                    </View>
                  )
                })}
              </View>
            </StyledContainer>
          )
        }}
      />
      <View
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 50,
          alignSelf: 'center',
          mt: '$5',
        }}
      >
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
      </View>
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
        backgroundColor: '#99ECFE',
        borderColor: '#99ECFE',
        borderWidth: 1,
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
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

const StyledContainer = styled(View)({
  bg: '$primary',
  borderRadius: 10,
  mx: '$12',
  bottom: '$8',
})

const StyledLabel = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 2,
})

const StyledTitle = styled(Text)({
  color: 'white',
  textTransform: 'capitalize',
  paddingLeft: '$5',
  padding: '$3',
})

const StyledMore = styled(Text)({
  color: 'white',
  padding: '$3',
  paddingRight: '$5',
})

export default GamesSection
