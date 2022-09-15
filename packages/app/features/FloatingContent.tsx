import { MEDIA_DOMAIN } from '@env'
import Fab from 'app/components/button/Fab'
import Image from 'app/components/common/Image'
import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { BOTTOM_NAV_HEIGHT } from 'app/navigation/BottomNavigation'
import FloatQr from 'app/navigation/FloatQr'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ActionType, getAction } from 'app/utils/actionGenerator'
import { useDripsyTheme, View } from 'dripsy'
import { Platform, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Game } from 'services/contentApi.type'
import { useRouter } from 'solito/router'

const FloatingContent = () => {
  // Google Pixel 5a require this insets to get accurate value
  const insets = useSafeArea()

  const { width } = useWindowDimensions()
  const { width: containerWidth } = useContainerDimension()
  const { theme } = useDripsyTheme()

  const { push } = useRouter()
  const { returnHref, makeContextualHref } = useContextualRouting()
  const toCustomerSupport = makeContextualHref('customer-support')

  const navigateToCustomerSupportPage = () => {
    push(toCustomerSupport, '/customer-support')
  }

  const launchVGaming = () => {
    const action = {
      type: ActionType.GAME,
      payload: {
        tags: [],
        name: {
          en: 'VGaming',
          vi: 'Fish Prawn Crab',
        },
        gc: 'Vgaming:3804',
        gpc: 'SABA',
        gtc: 'games',
        img: `${MEDIA_DOMAIN}/nvclub/nova-club/content/games/hotgames/Vgaming-FishPrawnCrabl.jpg`,
      } as Game,
    }

    getAction(action)()
  }

  const vGamingSize = Math.min(110, width * 0.2)

  return (
    <>
      <View
        sx={{
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          top: 120 + insets.top,
          right: Math.max(0, (width - theme.sizes.container) / 2),
        }}
      >
        <FloatQr />
      </View>

      <View
        sx={{
          right:
            Math.max(0, (width - theme.sizes.container) / 2) +
            Math.max(containerWidth * 0.2 - vGamingSize, 0) / 2,
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          bottom: BOTTOM_NAV_HEIGHT + 25,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={launchVGaming}>
          <Image
            source={require('app/assets/images/Vgaming-icon.gif')}
            style={{
              width: vGamingSize,
              height: vGamingSize,
              marginBottom: 10,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Button
          onPress={navigateToCustomerSupportPage}
          rounded
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          containerStyle={{ width: 50, height: 50, px: 12 }}
        >
          {<Icon name="cs" size={30} />}
        </Button>

        {/* <Fab
          placement="bottom-right"
          iconProp={{
            name: 'cs',
          }}
          buttonProps={{
            onPress: navigateToCustomerSupportPage,
          }}
          sx={{
            bottom: BOTTOM_NAV_HEIGHT + 35,
            right: Math.max(0, (width - theme.sizes.container) / 2) + 10,
          }}
        /> */}
        {/* 

        <Fab
          buttonProps={{
            onPress: launchVGaming,
            fill: { type: 'ghost', color: 'transparent' },
            containerStyle: {
              px: 0,
            },
          }}
          placement="bottom-left"
          sx={{
            bottom: BOTTOM_NAV_HEIGHT + 25,
            left: 15,
          }}
        >
          <Video
            isMuted
            isLooping
            shouldPlay
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('app/assets/videos/vgaming.mp4')}
            resizeMode="cover"
            useNativeControls={false}
          />
        </Fab> */}
      </View>
    </>
  )
}

export default FloatingContent
