import Icon from 'agent/components/Icon'
import Text from 'agent/components/Text'
import useOnAgentLogout from 'agent/hooks/useOnAgentLogout'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { useAgentLocalization } from 'app/provider/localization'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { styled, Sx, useDripsyTheme, View } from 'dripsy'
import { Platform, TouchableOpacity, useWindowDimensions } from 'react-native'
import Modal from 'react-native-modal'
import Svg, { Path } from 'react-native-svg'

interface MainMenuTestProps {
  isShow: boolean
  onMenu: (...args: any[]) => any
  parentPosition: { x: Sx['width']; y: Sx['height'] }
}

const MainMenuTest = ({
  isShow,
  onMenu,
  parentPosition,
}: MainMenuTestProps) => {
  const { t } = useAgentLocalization()
  const { top: safeAreaTopHeight } = useSafeArea()
  const { logout } = useOnAgentLogout()

  const { push } = useContextualRouter()

  const { width } = useWindowDimensions()
  const { theme } = useDripsyTheme()
  const { x: parentWidth, y: parentHeight } = parentPosition

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

  const mainMenuList = [
    {
      label: 'menu.desktopVersion',
      icon: 'desktop',
      onPress: () => {
        console.log('first')
      },
    },
    {
      label: 'menu.resetPin',
      icon: 'change-pin',
      onPress: () => push('/agent/reset-pin'),
    },
    {
      label: 'menu.changePass',
      icon: 'password',
      onPress: () => push('/agent/change-password'),
    },
    {
      label: 'menu.switchMember',
      icon: 'switch',
      onPress: () => {
        push('/')
      },
    },
    {
      label: 'menu.logout',
      icon: 'logout',
      onPress: logout,
    },
  ]

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
      <View
        sx={{
          position: 'absolute',
          // width: width,
          top: TOP_HEIGHT,
          right: Math.max(0, (width - theme.sizes.container) / 2),
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        {/* <View sx={{ height: 200, width: width / 2 }}></View> */}
        <View
          pointerEvents="none"
          sx={{
            // height: 100,
            // width: width,
            // top: CURVE_TOP_HEIGHT,
            top: -15,
            right: 9,
            marginLeft: 'auto',
            // backgroundColor: '#000',
            // opacity: 0.5,
          }}
        >
          <Svg height={20} width={20}>
            <Path
              // d="M380 120 Q 425 140 420 100 V 120 H 360"
              d="M0 20 Q 20 10 20 0 V 20 H 80"
              fill={'#fff'}
              fillOpacity={0.8}
            />
          </Svg>
        </View>
        <StyledContainer>
          {mainMenuList.map((i, index) => {
            const lastItem = index === mainMenuList.length - 1
            const isSwitchAcc = index === mainMenuList.length - 2
            return (
              <StyledWrapList
                onPress={() => {
                  i.onPress && i.onPress()
                  handleDismiss()
                }}
                key={i.label}
              >
                <Icon
                  name={i.icon}
                  size={23}
                  color={lastItem ? 'red' : 'black'}
                />
                <StyleText sx={{ color: lastItem ? 'red' : 'black' }}>
                  {t(i.label)}
                </StyleText>
              </StyledWrapList>
            )
          })}
        </StyledContainer>
      </View>
    </Modal>
  )
}

const StyledContainer = styled(View)({
  // position: 'absolute',
  bg: 'rgba(255,255,255,0.8)',
  borderTopLeftRadius: 20,
  top: -15,
  right: 9,
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
  color: '$textAgent',
  ml: '$8',
})

export default MainMenuTest
