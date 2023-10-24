import BottomTabBar, {
  BOTTOM_TAB_BAR_HEIGHT,
} from 'app/components/navigation/BottomTabBar'
import MainHeader from 'app/components/navigation/header/MainHeader'
import { HEADER_HEIGHT } from 'app/utils/constant'
import { ReactNode, useEffect } from 'react'
import AppDownloadSuggestion from 'app/components/AppDownloadSuggestion'

export default function TabLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    console.log('Header Mounted')
  }, [])

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
