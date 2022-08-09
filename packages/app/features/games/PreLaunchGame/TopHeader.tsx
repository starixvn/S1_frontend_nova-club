import Icon from 'app/components/Icon'
import { getProviderLogo } from 'app/config/games/provider'
import BouncePressable from 'app/pressable/BouncePressable'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { Image, styled, View } from 'dripsy'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'

const TopHeader = ({ providerCode }: { providerCode?: string }) => {
  const { back } = useRouter()
  const dispatch = useDispatch()
  const onGoBack = () => {
    back()
    dispatch(GameLauncherActions.reset())
  }

  return (
    <StyledTop>
      <BouncePressable onPress={onGoBack} sx={{ p: '$2' }}>
        <Icon name="chevleft" size={26} color="#9CD9FA" />
      </BouncePressable>
      <View sx={{ alignItems: 'center', flex: 0.9 }}>
        <Image
          source={providerCode && getProviderLogo(providerCode)}
          sx={{ height: 35, width: 160 }}
          resizeMode="contain"
        />
      </View>
    </StyledTop>
  )
}

const StyledTop = styled(View)({
  flexDirection: 'row',
  py: '$5',
  pl: '$2',
  alignItems: 'center',
})

export default TopHeader
