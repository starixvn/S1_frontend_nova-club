import { Button } from 'app/components/form/Button'
import Icon from 'app/components/Icon'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { BOTTOM_NAV_HEIGHT } from 'app/navigation/BottomNavigation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useDripsyTheme, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import FloatingSpinMania from './FloatingSpinMania'
import SupportMenu from './SupportMenu'
import ToggleFloatingButton from './ToggleFloatingButton'
import VGaming from './VGaming'
const FloatingContentSwitch = () => {
  const [isSupportMenuVisible, setSupportMenuVisible] = useState(false)
  // Google Pixel 5a require this insets to get accurate value
  const [isOpen, setIsOpen] = useState(true)

  const { width } = useWindowDimensions()
  const { width: containerWidth, height: containerHeight } =
    useContainerDimension()
  const { theme } = useDripsyTheme()
  let right = Math.max(0, (width - theme.sizes.container) / 2)

  const vGamingSize = Math.min(110, width * 0.2)

  const { bottom } = useSafeArea()
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <MotiView
            from={{ transform: [{ translateX: 100 }], opacity: 0 }}
            transition={{ type: 'timing', duration: 800 }}
            animate={{ transform: [{ translateX: 0 }], opacity: 1 }}
            exit={{ transform: [{ translateX: 100 }], opacity: 0 }}
            style={{
              zIndex: 9,
              right: 0,
              bottom: BOTTOM_NAV_HEIGHT + bottom + 40,
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
              overflow: Platform.OS === 'web' ? 'hidden' : 'visible',
              backgroundColor: 'rgba(30,30,30,0.4)',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <View
              sx={{
                py: '$2',
                pl: '$2',
                alignItems: 'center',
                paddingRight:
                  Platform.OS === 'web'
                    ? '$5'
                    : Math.max(0, (width - theme.sizes.container) / 2) +
                      Math.max(containerWidth * 0.35 - vGamingSize, 0) / 2,
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
          </MotiView>
        )}
      </AnimatePresence>
      {/* Position Absolute on the first parent of Touchable Opacity will cause clicked through */}
      <View
        sx={{
          position: 'absolute',
          zIndex: 10,
          right: 0,
          bottom: BOTTOM_NAV_HEIGHT + bottom + 110,
        }}
      >
        <View
          sx={{
            justifyContent: 'center',
          }}
        >
          <ToggleFloatingButton setIsOpen={setIsOpen} isOpen={isOpen} />
        </View>
      </View>

      <AnimatePresence>
        {isSupportMenuVisible && (
          <SupportMenu setSupportMenuVisible={setSupportMenuVisible} />
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingContentSwitch
