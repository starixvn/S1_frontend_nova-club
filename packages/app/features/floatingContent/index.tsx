import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { memo } from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import FloatingDrawer from './component/FloatingDrawer'
import ToggleFloatingDrawerButton from './component/ToggleFloatingDrawerButton'
import { View } from 'dripsy'

const FloatingContent = ({
  BottomTabBarHeight,
}: {
  BottomTabBarHeight: number
}) => {
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const isFloatingDrawerOpen = useAppSelector((s) => s.setting.floatingDrawer)
  // const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const { width } = useWindowDimensions()
  const { bottom } = useSafeArea()

  // const isFloatingVisible = isLoggedIn
  const DESKTOP_BOTTOM_POSITION = 100
  const DRAWER_BOTTON_POSITION = 70
  const DRAWER_BUTTON_HEIGHT = 60
  const ICON_SIZE = Math.min(80, width * 0.18)
  const NUMBER_OF_FLOATING_CONTENT = isDesktop ? 1 : 1

  const BOTTOM_TAB_HEIGHT = isDesktop ? 0 : BottomTabBarHeight

  const DRAWER_HEIGHT = ICON_SIZE * NUMBER_OF_FLOATING_CONTENT + 40
  const MOBILE_BOTTOM_POSITION =
    BOTTOM_TAB_HEIGHT + bottom + DRAWER_BOTTON_POSITION
  const DRAWER_BUTTON_POSITION =
    (isDesktop ? DESKTOP_BOTTOM_POSITION : MOBILE_BOTTOM_POSITION) +
    DRAWER_HEIGHT * 0.5 -
    DRAWER_BUTTON_HEIGHT * 0.5

  return (
    <>
      <FloatingDrawer
        visible={isFloatingDrawerOpen}
        size={ICON_SIZE}
        floatingDrawerOffset={
          isDesktop ? DESKTOP_BOTTOM_POSITION : MOBILE_BOTTOM_POSITION
        }
        isDesktop={isDesktop}
        floatingDrawerHeight={DRAWER_HEIGHT}
      />
      <ToggleFloatingDrawerButton
        isDesktop={isDesktop}
        toggleFloatingDrawer={() => {
          dispatch(SettingActions.setFloatingDrawer(!isFloatingDrawerOpen))
        }}
        visible={isFloatingDrawerOpen}
        drawerButtonOffset={DRAWER_BUTTON_POSITION}
      />
    </>
  )
}

export default memo(FloatingContent)
