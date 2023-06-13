import MainHeader, {
  HEADER_HEIGHT,
} from 'desktop-ext/components/layout/MainHeader'
import { ReactNode } from 'react'

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        paddingTop: HEADER_HEIGHT,
      }}
    >
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
        height: HEADER_HEIGHT,
        color: 'white',
      }}
    >
      <MainHeader />
    </div>
  )
}

const Footer = () => {
  return <div style={{ color: 'white' }}>Footer</div>
}
