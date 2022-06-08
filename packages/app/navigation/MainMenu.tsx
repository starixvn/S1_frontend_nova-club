import { Portal } from '@gorhom/portal'
import { logOut } from 'app/utils/authUtil'
import { Image, styled, View } from 'dripsy'
import { useMemo } from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'solito/router'

const MainMenu = () => {
  const { push } = useRouter()
  const iconHeight = 30
  const top = 10
  const webTop = 20
  const isWeb = Platform.OS === 'web'
  const isAndroid = Platform.OS === 'android'
  const TOP_HEIGHT = isWeb
    ? iconHeight + webTop
    : isAndroid
    ? StatusBar.currentHeight + iconHeight + top
    : useSafeAreaInsets().top + iconHeight + top

  //change to icon
  const MENU_LIST = useMemo(
    () => [
      {
        label: 'Agent Login',
        img: require('../assets/images/menu/agent.png'),
      },
      {
        label: 'Deposit',
        img: require('../assets/images/menu/deposit.png'),
      },
      {
        label: 'Withdrawal',
        img: require('../assets/images/menu/wallet.png'),
      },
      {
        label: 'Transfer',
        img: require('../assets/images/menu/transfer.png'),
      },
      {
        label: 'Customer Support',
        img: require('../assets/images/menu/cs.png'),
      },
      {
        label: 'Switch Account',
        img: require('../assets/images/menu/switch.png'),
      },
      {
        label: 'Logout',
        img: require('../assets/images/menu/transfer.png'),
        onPress: async () => {
          await logOut()
          // TODO: add loading to prevent spamming
          push('/auth/login')
        },
      },
    ],
    []
  )

  return (
    <Portal>
      <Image
        source={require('../assets/images/menu/curve.png')}
        sx={{
          height: [30, 30, 30],
          width: [30, 30, 30],
          position: 'absolute',
          top: [TOP_HEIGHT - 28, TOP_HEIGHT - 10, TOP_HEIGHT - 15],
          right: 18,
        }}
      />
      <StyledContainer
        sx={{ mt: [TOP_HEIGHT, TOP_HEIGHT + 10, TOP_HEIGHT + 15] }}
      >
        {MENU_LIST.map((i, index) => {
          const lastItem = index === MENU_LIST.length - 1
          const isSwitchAcc = index === MENU_LIST.length - 2
          return (
            <StyledWrapList
              onPress={i.onPress}
              key={i.label}
              sx={{
                bg: isSwitchAcc
                  ? 'rgba(103,17,17,0.9)'
                  : lastItem
                  ? 'rgba(26,64,98,0.5)'
                  : null,
              }}
            >
              <Image
                source={i.img}
                sx={{ height: [25, 20, 30], width: [30, 20, 30] }}
                resizeMode="contain"
              />
              <StyleText sx={{ color: lastItem ? 'grey' : 'white' }}>
                {i.label}
              </StyleText>
            </StyledWrapList>
          )
        })}
      </StyledContainer>
    </Portal>
  )
}

const StyledContainer = styled(View)({
  position: 'absolute',
  bg: 'rgba(0,0,0,0.9)',
  borderTopLeftRadius: 20,
  right: 18,
  zIndex: 1,
  pt: '$5',
})

const StyledWrapList = styled(TouchableOpacity)({
  flexDirection: 'row',
  px: '$7',
  py: '$3',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const StyleText = styled(Text)({
  fontSize: 16,
  color: '$text',
  ml: '$15',
})

export default MainMenu
