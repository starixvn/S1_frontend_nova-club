import { BOTTOM_NAV_HEIGHT } from 'app/navigation/BottomNavigation'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { usePlayerProfileQuery } from 'services/playerApi'
import { FloatingContext } from './FloatingContext'
import FloatingDrawer from './component/FloatingDrawer'
import SupportMenu from './component/SupportMenu'
import ToggleFloatingDrawerButton from './component/ToggleFloatingDrawerButton'
import FloatingQr from './component/FloatingQr'

const FloatingContent = () => {
  const [activeLiveChat, setActiveLiveChat] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const { isCreditMember } = usePlayerProfileQuery()
  const { width } = useWindowDimensions()
  const { bottom } = useSafeArea()

  const iconSize = Math.min(80, width * 0.18)
  const floatButtonOffset = iconSize * 1.3
  const drawerButtonOffset = BOTTOM_NAV_HEIGHT + bottom + floatButtonOffset
  const floatingDrawerOffset = BOTTOM_NAV_HEIGHT + bottom + 30

  const MemoizedFloatingContext = useMemo(
    () => ({ activeLiveChat, toggleLiveChat: setActiveLiveChat }),
    [activeLiveChat]
  )
  return (
    <FloatingContext.Provider value={MemoizedFloatingContext}>
      <FloatingDrawer
        visible={isOpen}
        size={iconSize}
        floatingDrawerOffset={floatingDrawerOffset}
      />
      <ToggleFloatingDrawerButton
        toggleFloatingDrawer={setIsOpen}
        visible={isOpen}
        drawerButtonOffset={drawerButtonOffset}
      />
      {!isCreditMember && <FloatingQr />}
      <SupportMenu
        setSupportMenuVisible={setActiveLiveChat}
        visible={activeLiveChat}
      />
    </FloatingContext.Provider>
  )
}

export default FloatingContent
