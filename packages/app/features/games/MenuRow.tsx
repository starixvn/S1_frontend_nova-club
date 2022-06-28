import { DripsyGradient } from 'app/components/Gradient'
import BouncePressable from 'app/pressable/BouncePressable'
import { Image, styled, Text } from 'dripsy'
import { useRouter } from 'solito/router'
const DATA = [
  {
    label: 'Slots',
    img: require('../../assets/images/games/slots.png'),
    route: '/slot',
  },
  // {
  //   label: 'Local Games',
  //   img: require('../../assets/images/games/dice.png'),
  // },
  {
    label: 'Fishing Games',
    img: require('../../assets/images/games/fishing.png'),
    route: '/games/fishing',
  },
  {
    label: 'Keno/Lottery',
    img: require('../../assets/images/games/lottery.png'),
    route: '/games/lottery',
  },
  {
    label: 'Poker',
    img: require('../../assets/images/games/poker.png'),
    route: '/',
  },
]
const MenuRow = () => {
  const { push } = useRouter()

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
              onPress={() => push(i.route)}
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
