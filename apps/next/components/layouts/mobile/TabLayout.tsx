import BottomTabBar, {
  BOTTOM_TAB_BAR_HEIGHT,
} from 'app/components/navigation/BottomTabBar'
import MainHeader from 'app/components/navigation/header/MainHeader'
import { HEADER_HEIGHT } from 'app/utils/constant'
import { ReactNode, useEffect } from 'react'

export default function MobileBaseLayout({
  children,
}: {
  children: ReactNode
}) {
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
    <MainHeader />
  </div>
)

const FloatedBottomBar = () => {
  return (
    <div
      style={{
        bottom: 0,
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: BOTTOM_TAB_BAR_HEIGHT,
      }}
    >
      <BottomTabBar />
    </div>
  )
}
