import { Image, Pressable, styled, Text, View } from 'dripsy'
import { FC } from 'react'
import { useWindowDimensions } from 'react-native'

export interface GameCardProps {
  gameList: any
  label: string
}

const GameCard: FC<GameCardProps> = ({ label, gameList }) => {
  const { width } = useWindowDimensions()
  const img = gameList.slice(0, 6)

  const StyledImage = styled(Image)({
    mx: '$1a',
    borderRadius: 5,
    height: [160, 250, 330],
    width: [width / 2.6, width / 2.5, width / 2.3],
  })

  return (
    <StyledContainer key={label}>
      <StyledLabel>
        <StyledTitle>{label}</StyledTitle>
        <Pressable>
          <StyledMore>{`>`}</StyledMore>
        </Pressable>
      </StyledLabel>
      <StyledWrapItem>
        {img.map((r, rindex) => {
          return (
            <View sx={{ mx: '$0a' }} key={rindex}>
              <StyledImage source={r.image} />
            </View>
          )
        })}
      </StyledWrapItem>
    </StyledContainer>
  )
}

const StyledContainer = styled(View)({
  bg: '$primary',
  borderRadius: 10,
  mx: '$6',
  bottom: '$4',
})

const StyledLabel = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 2,
})

const StyledTitle = styled(Text)({
  color: 'white',
  textTransform: 'capitalize',
  paddingLeft: '$2a',
  padding: '$1a',
})

const StyledMore = styled(Text)({
  color: 'white',
  padding: '$1a',
  paddingRight: '$2a',
})

const StyledWrapItem = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
})
export default GameCard
