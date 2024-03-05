import AppDownloadSuggestion from 'app/components/AppDownloadSuggestion'
import BottomTabBar, {
  BOTTOM_TAB_BAR_HEIGHT,
} from 'app/components/navigation/BottomTabBar'
import MainHeader from 'app/components/navigation/header/MainHeader'
import DraggableFloatingMystery from 'app/features/floatingContent/DraggableFloatingMystery'
import { ReactNode } from 'react'
import { HEADER_HEIGHT } from 'utils/constant'

export default function TabLayout({ children }: { children: ReactNode }) {
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

//H5 floating mystery
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
      <DraggableFloatingMystery />
      <BottomTabBar />
    </div>
  )
}
