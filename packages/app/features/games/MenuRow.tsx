import { DripsyGradient } from 'app/components/Gradient'
import BouncePressable from 'app/pressable/BouncePressable'
import { Image, styled, Text, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
const DATA = [
  {
    label: 'Slots',
    img: require('../../assets/images/games/slots.png'),
  },
  {
    label: 'Local Games',
    img: require('../../assets/images/games/dice.png'),
  },
  {
    label: 'Fishing Games',
    img: require('../../assets/images/games/fishing.png'),
  },
  {
    label: 'Keno/Lottery',
    img: require('../../assets/images/games/lottery.png'),
  },
  {
    label: 'Poker',
    img: require('../../assets/images/games/poker.png'),
  },
]
const MenuRow = () => {
  return (
    <DripsyGradient gradient={'darkBlue'}>
      <StyledListView gradient={'navyBlue'}>
        {DATA.map((i) => {
          return (
            <BouncePressable
              key={i.label}
              style={{
                alignItems: 'center',
              }}
            >
              <StyledImage source={i.img} resizeMode={'stretch'} />
              <StyledText>{i.label}</StyledText>
            </BouncePressable>
          )
        })}
      </StyledListView>
    </DripsyGradient>
  )
}

const StyledImage = styled(Image)({
  height: [75, 120, 150],
  width: [75, 120, 150],
})
const StyledText = styled(Text)({
  textAlign: 'center',
  alignSelf: 'center',
  fontSize: 10,
  width: '90%',
  mt: -10,
  mb: '$2a',
})

const StyledListView = styled(DripsyGradient)({
  mx: '$2a',
  my: '$2a',
  mb: '$5',
  flexDirection: 'row',
  justifyContent: 'space-around',
  borderRadius: 15,
  borderWidth: 1,
  borderColor: '$lightNavyBlue',
})
export default MenuRow
