import fishing from 'app/config/games/fishing'
import hotgame from 'app/config/games/hotgame'
import lottery from 'app/config/games/lottery'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { styled, View } from 'dripsy'
import React, { FC } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'
import { CarouselRenderItem } from 'react-native-reanimated-carousel/lib/typescript/types'
import {
  GAMES_GAME_CARD_WIDTH_PERCENTAGE,
  GAMES_GAME_GROUP_ROW,
  GAMES_GAME_GROUP_WIDTH_PERCENTAGE,
  HORIZONTAL_PADDING_PERCENTAGE,
} from '../screen'
import GameCard, { GameCardProps } from './GameCard'
import SectionHeader from './SectionHeader'

const GamesSection = () => {
  const data = [fishing, lottery, hotgame]
  const { width, height } = useContainerDimension()

  const StyledCarousel = styled(Carousel)({
    height:
      width *
      (GAMES_GAME_CARD_WIDTH_PERCENTAGE * GAMES_GAME_GROUP_ROW +
        HORIZONTAL_PADDING_PERCENTAGE * 4),
  })

  const selectedColor = 'rgb(65,64,95)'
  const colors = [selectedColor, selectedColor, selectedColor]
  const progressValue = useSharedValue<number>(0)

  return (
    <View>
      <SectionHeader title={'GAMES'} bgColor="green" iconName="games" />
      <StyledCarousel
        loop={false}
        width={width}
        data={data}
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset:
            width -
            width *
              (GAMES_GAME_GROUP_WIDTH_PERCENTAGE +
                HORIZONTAL_PADDING_PERCENTAGE),
          parallaxAdjacentItemScale: 1,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={renderItem}
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
  )
}

const renderItem: CarouselRenderItem<GameCardProps> = ({ item }) => {
  return <GameCard label={item.label} gameList={item.gameList} />
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
  width: 50,
  alignSelf: 'center',
  mt: '$2a',
})

const StyledBoxPaginatiom = styled(View)({
  backgroundColor: '#99ECFE',
  borderColor: '#99ECFE',
  borderWidth: 1,
  width: 10,
  height: 10,
  borderRadius: 50,
  overflow: 'hidden',
})

export default GamesSection
