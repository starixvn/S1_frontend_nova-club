import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, styled, Sx, View } from 'dripsy'
import { useMemo } from 'react'
import { Platform, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useRouter } from 'solito/router'

interface MainMenuProps {
  isShow: boolean
  onMenu: (...args: any[]) => any
  parentPosition: { x: Sx['width']; y: Sx['height'] }
}

const MainMenu = ({ isShow, onMenu, parentPosition }: MainMenuProps) => {
  const { t } = useLocalization()
  const { push, replace } = useRouter()
  const { top: safeAreaTopHeight } = useSafeArea()
  const { x: parentWidth, y: parentHeight } = parentPosition

  const { makeContextualHref } = useContextualRouting()
  const { logout } = useOnAppLogout()

  const isWeb = Platform.OS === 'web'
  const isAndroid = Platform.OS === 'android'
  const modalRightPosition = Array.isArray(parentWidth)
    ? parentWidth.map((width) => width / 2)
    : Number(parentWidth) / 2

  const iosTopHeight = Array.isArray(parentHeight)
    ? parentHeight.map((height) => height + safeAreaTopHeight)
    : Number(parentHeight) + safeAreaTopHeight
  const TOP_HEIGHT = isWeb || isAndroid ? parentHeight : iosTopHeight

  const tooltipArrowHeight = [40, 30, 30]
  const CURVE_TOP_HEIGHT = isWeb
    ? tooltipArrowHeight.map((height) => -height)
    : tooltipArrowHeight.map((height) => -(height / 1.2))

  //change to icon
  const MENU_LIST = useMemo(
    () => [
      {
        label: 'menu.agentLogin',
        icon: 'profile',
      },
      {
        icon: 'dac',
        label: 'menu.deposit',
        onPress: () => {
          push(makeContextualHref('deposit'), '/deposit')
        },
      },
      {
        icon: 'wda',
        label: 'menu.withdrawal',
        onPress: () => {
          push(makeContextualHref('withdrawal'), '/withdrawal')
        },
      },
      {
        label: 'menu.customerSupport',
        icon: 'cs',
        onPress: () => {
          push(makeContextualHref('customer-support'), '/customer-support')
        },
      },
      // {
      //   label: 'Switch Accountss',
      //   icon: 'switch',
      //   onPress: () => {
      //     throw 'fromIOS-hereeee'
      //   },
      // },
      {
        icon: 'logout',
        label: 'menu.logout',
        onPress: async () => {
          try {
            await logout()
          } catch (error) {
            console.error(error)
          }
        },
      },
    ],
    [logout, makeContextualHref, push]
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
      coverScreen={isWeb ? false : true}
      style={{
        margin: 0,
      }}
    >
      <StyledContainer
        sx={{
          top: TOP_HEIGHT,
          right: modalRightPosition,
        }}
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
              height: tooltipArrowHeight,
              width: [40, 30, 30],
            }}
          />
        </View>

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
                {t(i.label)}
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
