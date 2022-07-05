import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { logOut } from 'app/utils/authUtil'
import { Image, styled, View } from 'dripsy'
import { useMemo } from 'react'
import { Platform, StatusBar, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'solito/router'
import { ContextualModuleKey } from './web/withContextualNavConstant'

const MainMenu = ({ isShow, onMenu }) => {
  const { push } = useRouter()

  const { makeContextualHref } = useContextualRouting(ContextualModuleKey.Home)
  const iconHeight = 20
  const top = 10
  const isWeb = Platform.OS === 'web'
  const isAndroid = Platform.OS === 'android'
  const TOP_HEIGHT = isWeb
    ? iconHeight + 10
    : isAndroid
    ? StatusBar.currentHeight - 5
    : useSafeAreaInsets().top + iconHeight
  const CURVE_TOP_HEIGHT = isWeb ? 0 : isAndroid ? -top : top

  //change to icon
  const MENU_LIST = useMemo(
    () => [
      {
        label: 'Agent Login',
        icon: 'profile',
      },
      {
        label: 'Deposit',
        icon: 'deposit',
        onPress: () => {
          push(makeContextualHref('deposit'), '/deposit')
        },
      },
      {
        label: 'Withdrawal',
        icon: 'wallet',
        onPress: () => {
          push(makeContextualHref('withdrawal'), '/withdrawal')
        },
      },
      {
        label: 'Customer Support',
        icon: 'cs',
        onPress: () => {
          push(makeContextualHref('customer-support'), '/customer-support')
        },
      },
      {
        label: 'Switch Account',
        icon: 'switch',
      },
      {
        label: 'Logout',
        icon: 'transfer',
        onPress: async () => {
          await logOut()
          // TODO: add loading to prevent spamming
          push('/auth/login')
        },
      },
    ],
    [push]
  )

  const handleDismiss = () => {
    onMenu(false)
  }

  return (
    <Modal
      isVisible={isShow}
      onBackdropPress={handleDismiss}
      backdropOpacity={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
    >
      <View
        pointerEvents="none"
        sx={{
          position: 'absolute',
          top: CURVE_TOP_HEIGHT,
          right: 0,
        }}
      >
        <Image
          source={require('../assets/images/menu/curve.png')}
          sx={{
            height: [40, 30, 30],
            width: [40, 30, 30],
          }}
        />
      </View>
      <StyledContainer
        sx={{ top: [TOP_HEIGHT, TOP_HEIGHT + 10, TOP_HEIGHT + 15] }}
      >
        {MENU_LIST.map((i, index) => {
          const lastItem = index === MENU_LIST.length - 1
          const isSwitchAcc = index === MENU_LIST.length - 2
          return (
            <StyledWrapList
              onPress={() => {
                i.onPress && i.onPress()
                handleDismiss()
              }}
              key={i.label}
              sx={{
                bg: isSwitchAcc
                  ? 'rgba(103,17,17,0.9)'
                  : lastItem
                  ? 'rgba(26,64,98,0.5)'
                  : null,
              }}
            >
              <Icon name={i.icon} size={23} />
              <StyleText sx={{ color: lastItem ? 'grey' : 'white' }}>
                {i.label}
              </StyleText>
            </StyledWrapList>
          )
        })}
      </StyledContainer>
    </Modal>
  )
}

const StyledContainer = styled(View)({
  position: 'absolute',
  bg: 'rgba(0,0,0,0.9)',
  borderTopLeftRadius: 20,
  right: 0,
  zIndex: 1,
  pt: '$2a',
})

const StyledWrapList = styled(TouchableOpacity)({
  flexDirection: 'row',
  px: '$3a',
  py: '$1a',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const StyleText = styled(Text)({
  fontSize: 16,
  color: '$text',
  ml: '$8',
})

export default MainMenu
