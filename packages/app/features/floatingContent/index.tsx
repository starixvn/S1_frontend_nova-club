import { BOTTOM_NAV_HEIGHT } from 'app/constant/sizes'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { memo, useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import FloatingDrawer from './component/FloatingDrawer'
import FloatingQr from './component/FloatingQr'
import SupportMenu from './component/SupportMenu'
import ToggleFloatingDrawerButton from './component/ToggleFloatingDrawerButton'
import { FloatingContext } from './FloatingContext'

const FloatingContent = () => {
  const [activeLiveChat, setActiveLiveChat] = useState(false)
  const dispatch = useDispatch()

  const isFloatingDrawerOpen = useAppSelector((s) => s.setting.floatingDrawer)
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const { width } = useWindowDimensions()
  const { bottom } = useSafeArea()

  const isFloatingVisible = isLoggedIn

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
        visible={isFloatingDrawerOpen}
        size={iconSize}
        floatingDrawerOffset={floatingDrawerOffset}
      />
      <ToggleFloatingDrawerButton
        toggleFloatingDrawer={() => {
          dispatch(SettingActions.setFloatingDrawer(!isFloatingDrawerOpen))
        }}
        visible={isFloatingDrawerOpen}
        drawerButtonOffset={drawerButtonOffset}
      />
      {isFloatingVisible && <FloatingQr />}
      <SupportMenu
        setSupportMenuVisible={setActiveLiveChat}
        visible={activeLiveChat}
      />
    </FloatingContext.Provider>
  )
}

export default memo(FloatingContent)
