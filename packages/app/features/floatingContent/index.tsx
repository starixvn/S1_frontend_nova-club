import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { memo } from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import FloatingDrawer from './component/FloatingDrawer'
import ToggleFloatingDrawerButton from './component/ToggleFloatingDrawerButton'
import { BOTTOM_TAB_BAR_HEIGHT } from 'app/components/navigation/BottomTabBar'

const FloatingContent = () => {
  const dispatch = useDispatch()

  const isFloatingDrawerOpen = useAppSelector((s) => s.setting.floatingDrawer)
  // const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const { width } = useWindowDimensions()
  const { bottom } = useSafeArea()

  // const isFloatingVisible = isLoggedIn

  const iconSize = Math.min(80, width * 0.18)
  const floatButtonOffset = iconSize * 1
  const drawerButtonOffset = BOTTOM_TAB_BAR_HEIGHT + bottom + floatButtonOffset
  const floatingDrawerOffset = BOTTOM_TAB_BAR_HEIGHT + bottom + 30

  return (
    <>
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
    </>
  )
}

export default memo(FloatingContent)
