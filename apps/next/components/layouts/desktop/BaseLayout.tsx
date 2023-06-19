import MainHeader from 'app/components/navigation/header/MainHeader'
import { HEADER_HEIGHT } from 'app/utils/constant'
import NavigationHeader, {
  NAVIGATION_HEIGHT,
} from 'desktop-ext/components/layout/NavigationHeader'
import DesktopFooter from 'desktop-ext/components/layout/Footer'
import { Container } from 'dripsy'
import { ReactNode } from 'react'

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ paddingTop: NAVIGATION_HEIGHT + HEADER_HEIGHT }}>
      <FloatedHeader />
      {children}
      <Footer />
    </div>
  )
}

const FloatedHeader = () => {
  return (
    <div
      style={{
        top: 0,
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: NAVIGATION_HEIGHT,
        color: 'white',
      }}
    >
      <MainHeader />
      <NavigationHeader />
    </div>
  )
}

const Footer = () => {
  return (
    <Container>
      <DesktopFooter />
    </Container>
  )
}
