import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Image, styled, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'

const TopHeader = () => {
  const { back } = useRouter()
  const dispatch = useDispatch()
  const onGoBack = () => {
    back()
    dispatch(GameLauncherActions.reset())
  }

  return (
    <StyledTop>
      <BouncePressable onPress={onGoBack}>
        <Icon name="chevleft" size={40} color="#9CD9FA" />
      </BouncePressable>
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
  py: '$5',
  alignItems: 'center',
})

export default TopHeader
