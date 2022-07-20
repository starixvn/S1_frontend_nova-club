import {
  GAMES_GAME_CARD_WIDTH_PERCENTAGE,
  GAMES_GAME_GROUP_WIDTH_PERCENTAGE,
  HOME_PADDING,
} from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { Image, Pressable, styled, Text, View } from 'dripsy'
import { FC } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

export interface GameCardProps {
  gameList: any
  label: string
}

const GameCard: FC<GameCardProps> = ({ label, gameList }) => {
  const { t } = useLocalization()
  const { width } = useContainerDimension()
  const img = gameList.slice(0, 6)

  const horizontalPad = width * HOME_PADDING
  const cardWidth = width * GAMES_GAME_CARD_WIDTH_PERCENTAGE

  // const cardListWidth = cardWidth * 2 + horizontalPad * 1.5
  const cardListWidth = width * GAMES_GAME_GROUP_WIDTH_PERCENTAGE

  return (
    <View
      sx={{
        pl: width * HOME_PADDING,
        flexDirection: 'row',
      }}
    >
      <StyledContainer
        key={label}
        sx={{ width: cardListWidth, padding: horizontalPad * 0.5 }}
      >
        <StyledLabel sx={{ height: horizontalPad * 3 }}>
          <Text sx={{ fontSize: [14, 16] }}>{t(label)}</Text>
          <Pressable>
            <StyledMore>{`>`}</StyledMore>
          </Pressable>
        </StyledLabel>
        <StyledWrapItem>
          {img.map((r, rindex) => {
            return (
              <TouchableOpacity onPress={() => {}} key={rindex}>
                <StyledImage width={cardWidth} source={r.image} />
              </TouchableOpacity>
            )
          })}
        </StyledWrapItem>
      </StyledContainer>
    </View>
  )
}

const StyledContainer = styled(View)({
  bg: '$primary',
  borderRadius: 10,
  // border to balancer the section header's border
  borderWidth: 2,
  borderColor: 'rgb(3, 52, 84)',
})

const StyledLabel = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  pl: '$3',
})

const StyledMore = styled(Text)({
  color: 'white',
  padding: '$1a',
  paddingRight: '$2a',
})

const StyledWrapItem = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
})

const StyledImage = styled(Image)(({ width }) => ({
  borderRadius: 5,
  height: width,
  width: width,
}))
export default GameCard
