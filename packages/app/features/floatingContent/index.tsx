import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { BOTTOM_NAV_HEIGHT } from 'app/navigation/BottomNavigation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useDripsyTheme, View } from 'dripsy'
import { AnimatePresence } from 'moti'
import { useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import FloatingQr from './FloatingQr'
import FloatingSpinMania from './FloatingSpinMania'
import SupportMenu from './SupportMenu'
import VGaming from './VGaming'

const FloatingContent = () => {
  const [isSupportMenuVisible, setSupportMenuVisible] = useState(false)
  // Google Pixel 5a require this insets to get accurate value
  const { isCreditMember } = usePlayerProfileQuery()

  const { width } = useWindowDimensions()
  const { width: containerWidth, height: containerHeight } =
    useContainerDimension()
  const { theme } = useDripsyTheme()

  const vGamingSize = Math.min(110, width * 0.2)

  const { bottom } = useSafeArea()

  return (
    <>
      <View
        sx={{
          zIndex: 9,
          right:
            Math.max(0, (width - theme.sizes.container) / 2) +
            Math.max(containerWidth * 0.2 - vGamingSize, 0) / 2,
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
          bottom: BOTTOM_NAV_HEIGHT + bottom + 40,
          alignItems: 'center',
        }}
      >
        <FloatingSpinMania />
        <VGaming />

        <Button
          onPress={() => {
            setSupportMenuVisible(true)
          }}
          rounded
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          containerStyle={{ width: 50, height: 50, px: 2 }}
        >
          {<Icon name="cs" size={30} />}
        </Button>
      </View>

      <AnimatePresence>
        {isSupportMenuVisible && (
          <SupportMenu setSupportMenuVisible={setSupportMenuVisible} />
        )}
      </AnimatePresence>

      {!isCreditMember && <FloatingQr />}
    </>
  )
}

export default FloatingContent
