import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { memo } from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import FloatingDrawer from './component/FloatingDrawer'
import ToggleFloatingDrawerButton from './component/ToggleFloatingDrawerButton'
import { useResponsiveValue } from 'dripsy'

const FloatingContent = ({
  BottomTabBarHeight,
}: {
  BottomTabBarHeight: number
}) => {
  const dispatch = useDispatch()
  const isDesktop = useResponsiveValue([false, false, false, true])
  const isFloatingDrawerOpen = useAppSelector((s) => s.setting.floatingDrawer)
  // const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const { width } = useWindowDimensions()
  const { bottom } = useSafeArea()

  // const isFloatingVisible = isLoggedIn
  const DESKTOP_BOTTOM_OFFSET = 60
  const bottomTabIconHeightOffset = 30
  const bottomTabBarHeight = isDesktop ? 0 : BottomTabBarHeight
  const PlinkoIconAdditionalHeight = 75
  const NUMBER_OF_FLOATING_CONTENT = isDesktop ? 1 : 2
  const iconSize = Math.min(80, width * 0.18)
  const floatingDrawerOffset =
    bottomTabBarHeight + bottom + bottomTabIconHeightOffset
  const floatingDrawerHeight =
    iconSize * NUMBER_OF_FLOATING_CONTENT + 20 + PlinkoIconAdditionalHeight
  const floatButtonOffset =
    floatingDrawerHeight / (NUMBER_OF_FLOATING_CONTENT + 1) +
    (isDesktop ? DESKTOP_BOTTOM_OFFSET - 50 : 0)
  const drawerButtonOffset = bottomTabBarHeight + bottom + floatButtonOffset

  return (
    <>
      <FloatingDrawer
        visible={isFloatingDrawerOpen}
        size={iconSize}
        floatingDrawerOffset={
          isDesktop ? DESKTOP_BOTTOM_OFFSET : floatingDrawerOffset
        }
        isDesktop={isDesktop}
        floatingDrawerHeight={floatingDrawerHeight}
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
