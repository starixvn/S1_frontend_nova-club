import useIsDesktop from 'app/hooks/useIsDesktop'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SettingActions } from 'app/store/setting.slice'
import { memo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import FloatingDrawer from './component/FloatingDrawer'
import ToggleFloatingDrawerButton from './component/ToggleFloatingDrawerButton'
import FloatingDownloadDrawer from './component/FloatingDownloadDrawer'
import ToggleFloatingDownloadButton from './component/ToggleFloatingDownloadButton'
import { HEADER_HEIGHT } from 'utils/constant'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'

export const TOP_TAB_BAR_HEIGHT = 60

const FloatingDownload = () => {
  const dispatch = useDispatch()
  const isDesktop = useIsDesktop()
  const isFloatingDrawerOpen = useAppSelector((s) => s.setting.floatingDrawer)
  // const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  const { width } = useWindowDimensions()
  const { bottom } = useSafeArea()
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  // const isFloatingVisible = isLoggedIn
  const DESKTOP_BOTTOM_OFFSET = 60
  const bottomTabIconHeightOffset = 30
  const bottomTabBarHeight = isDesktop ? 0 : TOP_TAB_BAR_HEIGHT
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
  const drawerButtonOffset = HEADER_HEIGHT + floatButtonOffset

  return (
    <>
      <FloatingDownloadDrawer
        visible={isOpenDrawer}
        size={iconSize}
        floatingDrawerOffset={
          isDesktop ? DESKTOP_BOTTOM_OFFSET : floatingDrawerOffset
        }
        isDesktop={isDesktop}
        floatingDrawerHeight={floatingDrawerHeight}
      />
      <ToggleFloatingDownloadButton
        toggleFloatingDrawer={() => {
          setIsOpenDrawer(!isOpenDrawer)
        }}
        visible={isOpenDrawer}
      />
    </>
  )
}

export default memo(FloatingDownload)
