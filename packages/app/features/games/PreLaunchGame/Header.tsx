import Icon from 'app/components/Icon'
import { Image, styled, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'

const Header = () => {
  const { back } = useRouter()
  const onGoBack = () => {
    back()
  }
  return (
    <StyledTop>
      <TouchableOpacity onPress={onGoBack}>
        <Icon name="chevleft" size={40} color="#9CD9FA" />
      </TouchableOpacity>
      <View sx={{ alignItems: 'center', flex: 0.9 }}>
        <Image
          source={require('../../../assets/images/games/saba-logo.png')}
          sx={{ height: [40, 40, 40], width: [120, 120, 120] }}
          resizeMode="cover"
        />
      </View>
    </StyledTop>
  )
}

const StyledTop = styled(View)({
  flexDirection: 'row',
  py: '$10',
  alignItems: 'center',
})

export default Header
