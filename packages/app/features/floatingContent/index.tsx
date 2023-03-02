import { BOTTOM_NAV_HEIGHT } from 'app/navigation/BottomNavigation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { View } from 'dripsy'
import { AnimatePresence } from 'moti'
import { createContext, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import FloatingContentSwitch from './FloatingContentSwitch'
import { FloatingContext } from './FloatingContext'
import FloatingQr from './FloatingQr'
import ToggleFloatingButton from './FloatingToggleButton'
import SupportMenu from './SupportMenu'

const FloatingContent = () => {
  const { isCreditMember } = usePlayerProfileQuery()
  const { width } = useWindowDimensions()
  const iconSize = Math.min(80, width * 0.18)
  const [isOpen, setIsOpen] = useState(true)
  const floatButtonOffset = iconSize * 1.3
  const { bottom } = useSafeArea()
  const [activeLiveChat, setActiveLiveChat] = useState(false)
  return (
    <>
      <FloatingContext.Provider
        value={{ activeLiveChat, toggleLiveChat: setActiveLiveChat }}
      >
        <View
          pointerEvents={isOpen ? 'auto' : 'none'}
          style={{
            zIndex: 9,
            right: 0,
            bottom: BOTTOM_NAV_HEIGHT + bottom + 30,
            position: 'absolute',
            height: iconSize * 3 + 20,
            width: 120,
            overflow: 'hidden',
          }}
        >
          <FloatingContentSwitch isOpen={isOpen} iconSize={iconSize} />
        </View>
        <View
          sx={{
            position: 'absolute',
            zIndex: 9,
            right: 0,
            bottom: BOTTOM_NAV_HEIGHT + bottom + floatButtonOffset,
          }}
        >
          <ToggleFloatingButton setIsOpen={setIsOpen} isOpen={isOpen} />
        </View>

        {!isCreditMember && <FloatingQr />}
        <AnimatePresence>
          {activeLiveChat && (
            <SupportMenu setSupportMenuVisible={setActiveLiveChat} />
          )}
        </AnimatePresence>
      </FloatingContext.Provider>
    </>
  )
}

export default FloatingContent
