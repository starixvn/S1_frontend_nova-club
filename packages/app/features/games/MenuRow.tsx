import { Image, styled, Text, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
const DATA = [
  {
    label: 'Slots',
    bg: '#f3b43e',
    img: require('../../assets/images/games/slots.png'),
  },
  {
    label: 'Games',
    bg: '#315fa7',
    img: require('../../assets/images/games/darts.png'),
  },
  {
    label: 'Fishing Games',
    bg: '#6fab46',
    img: require('../../assets/images/games/fishing.png'),
  },
  {
    label: 'Keno & Lottery',
    bg: '#faf5d5',
    img: require('../../assets/images/games/lottery.png'),
  },
  {
    label: 'Card/Table',
    bg: '#DA2D88',
    img: require('../../assets/images/games/cards.png'),
  },
]
const MenuRow = () => {
  return (
    <StyledListView>
      {DATA.map((i) => {
        return (
          <TouchableOpacity key={i.label}>
            <View
              sx={{
                bg: i.bg,
                borderRadius: 50,
                alignSelf: 'center',
              }}
            >
              <StyledImage source={i.img} resizeMode={'contain'} />
            </View>
            <StyledText sx={(theme) => theme.text.sm}>{i.label}</StyledText>
          </TouchableOpacity>
        )
      })}
    </StyledListView>
  )
}
const StyledImage = styled(Image)({
  height: [55, 70, 85],
  width: [55, 70, 85],
})
const StyledText = styled(Text)({
  textAlign: 'center',
  mt: '$5',
})

const StyledListView = styled(View)({
  mx: '$5',
  mt: '$5',
  flexDirection: 'row',
  justifyContent: 'space-around',
})
export default MenuRow
