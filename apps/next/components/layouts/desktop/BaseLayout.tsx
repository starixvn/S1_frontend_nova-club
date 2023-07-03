import MainHeader from 'app/components/navigation/header/MainHeader'
import { HEADER_HEIGHT } from 'app/utils/constant'
import NavigationHeader, {
  NAVIGATION_HEIGHT,
} from 'desktop-ext/components/layout/navigation/NavigationHeader'
import DesktopFooter from 'desktop-ext/components/layout/Footer'
import { ActivityIndicator, Container } from 'dripsy'
import { ReactNode, useEffect, useState } from 'react'
import NavigationHeaderProvider from 'desktop-ext/components/layout/navigation/NavigationHeaderProvider'
import { useRouter } from 'next/router'
import { AnimatePresence, MotiView } from 'moti'

export default function BaseLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState()

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true)
    const handleComplete = (url) => {
      return setLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  return (
    <div style={{ paddingTop: NAVIGATION_HEIGHT + HEADER_HEIGHT }}>
      <FloatedHeader />
      {children}
      <AnimatePresence>
        {loading && (
          <MotiView
            from={{ opacity: 0, translateY: 250 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 250 }}
            transition={{ type: 'timing' }}
            style={{
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'fixed',
              left: 0,
              right: 0,
              height: 250,
              bottom: 0,
              backgroundImage:
                'linear-gradient(to top,rgb(13, 32, 53), transparent)',
              // backgroundImage:
              //   'radial-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4), transparent, transparent)',
            }}
          >
            <ActivityIndicator color="white" size={40} sx={{ m: '$5' }} />
          </MotiView>
        )}
      </AnimatePresence>
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
      <NavigationHeaderProvider>
        <NavigationHeader />
      </NavigationHeaderProvider>
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
