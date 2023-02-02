import { AGENT_URL } from '@env'
import Icon from 'app/components/Icon'
import { LoginType } from 'app/features/auth/login'
import useOnAppLogout from 'app/hooks/useOnAppLogout'
import useLocalization from 'app/provider/localization'
import { useAppDispatch, useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, styled, Sx, useDripsyTheme, View } from 'dripsy'
import { useMemo } from 'react'
import {
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import Modal from 'react-native-modal'
import { usePlayerProfileQuery } from 'services/playerApi'
import useContextualRouter from './contextual/useContextualRouter'

interface MainMenuProps {
  isShow: boolean
  onMenu: (...args: any[]) => any
  parentPosition: { x: Sx['width']; y: Sx['height'] }
}

const MainMenu = ({ isShow, onMenu, parentPosition }: MainMenuProps) => {
  const { t } = useLocalization()
  const { push } = useContextualRouter()
  const { width } = useWindowDimensions()
  const { theme } = useDripsyTheme()
  const { top: safeAreaTopHeight } = useSafeArea()
  const { x: parentWidth, y: parentHeight } = parentPosition

  const { logout } = useOnAppLogout()
  const isAgentLoggedIn = useAppSelector((s) => !!s.agent.access_token)

  const isWeb = Platform.OS === 'web'
  const isAndroid = Platform.OS === 'android'

  const iosTopHeight = Array.isArray(parentHeight)
    ? parentHeight.map((height) => height + safeAreaTopHeight)
    : Number(parentHeight) + safeAreaTopHeight
  const TOP_HEIGHT = isWeb || isAndroid ? parentHeight : iosTopHeight

  const tooltipArrowHeight = [40, 30, 30]
  const CURVE_TOP_HEIGHT = isWeb
    ? tooltipArrowHeight.map((height) => -height)
    : tooltipArrowHeight.map((height) => -(height / 1.2))

  const { isCreditMember, data: playerData } = usePlayerProfileQuery()

  const isPlayerName = !!playerData?.firstName

  //change to icon
  const MENU_LIST = useMemo(() => {
    const menuList = [
      {
        label: 'menu.agentLogin',
        icon: 'profile',
        onPress: () => {
          try {
            if (isAgentLoggedIn) {
              push('/agent')
            } else {
              push('/auth/login', {
                t: LoginType.Agent,
              })
            }
          } catch (e) {
            console.log('Failed to open Agent url')
          }
        },
      },
      {
        label: 'menu.customerSupport',
        icon: 'cs',
        onPress: () => {
          push('/customer-support')
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
    ]

    if (!isCreditMember) {
      menuList.splice(
        1,
        0,
        {
          icon: 'dac',
          label: 'menu.deposit',
          onPress: () => {
            isPlayerName
              ? push('/deposit')
              : push(`/profile/account-verification`)
          },
        },
        {
          icon: 'wda',
          label: 'menu.withdrawal',
          onPress: () => {
            push('/withdrawal')
          },
        }
      )
    }

    return menuList
  }, [logout, push, isCreditMember])

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
      coverScreen
      style={{ margin: 0 }}
    >
      <StyledContainer
        sx={{
          top: TOP_HEIGHT,
          // right: modalRightPosition,
          right: Math.max(0, (width - theme.sizes.container) / 2),
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
