import AppDownloadSuggestion from 'app/components/AppDownloadSuggestion'
import BottomTabBar, {
  BOTTOM_TAB_BAR_HEIGHT,
} from 'app/components/navigation/BottomTabBar'
import TutorialScreen from 'app/components/navigation/TutorialScreen'
import MainHeader from 'app/components/navigation/header/MainHeader'
import { useAppSelector } from 'app/provider/redux/store'
import { ReactNode, useEffect, useState } from 'react'
import { HEADER_HEIGHT } from 'utils/constant'

export default function TabLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)
  const showTutorial = useAppSelector((s) => s.setting.triggerPopupTutorial)

  const [showAfterDelay, setShowAfterDelay] = useState(false)

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setShowAfterDelay(true)
    }, 500)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [isLoggedIn, showTutorial])

  return (
    <div
      style={{
        paddingTop: HEADER_HEIGHT,
        paddingBottom: BOTTOM_TAB_BAR_HEIGHT * 2,
      }}
    >
      <FloatedHeader />
      {children}
      <FloatedBottomBar />

      {isLoggedIn && showTutorial && showAfterDelay && <TutorialScreen />}
    </div>
  )
}

const FloatedHeader = () => (
  <div
    style={{
      top: 0,
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: HEADER_HEIGHT,
      color: 'white',
    }}
  >
    <AppDownloadSuggestion />
    <MainHeader />
  </div>
)

const FloatedBottomBar = () => {
  return (
    <div
      id="bottomTabBar"
      style={{
        bottom: 0,
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: BOTTOM_TAB_BAR_HEIGHT + 15,
      }}
    >
      <BottomTabBar />
    </div>
  )
}
