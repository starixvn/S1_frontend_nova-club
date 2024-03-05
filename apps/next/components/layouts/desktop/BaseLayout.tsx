import LazyIndicator from 'app/components/LazyIndicator'
import MainHeader from 'app/components/navigation/header/MainHeader'
import DraggableFloatingMystery from 'app/features/floatingContent/DraggableFloatingMystery'
import withLazyLoad from 'app/hoc/withLazyLoad'
import LiveChat from 'components/LiveChat'
import NavigationHeader, {
  NAVIGATION_HEIGHT,
} from 'desktop-ext/components/layout/navigation/NavigationHeader'
import NavigationHeaderProvider from 'desktop-ext/components/layout/navigation/NavigationHeaderProvider'
import { ActivityIndicator, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { HEADER_HEIGHT } from 'utils/constant'

const Footer = dynamic(() => import('desktop-ext/components/layout/Footer'), {
  loading: () => <LazyIndicator />,
  ssr: false,
})

const LazyFooter = withLazyLoad(Footer)

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
      <View
        sx={{
          minHeight: `calc(100vh - ${NAVIGATION_HEIGHT + HEADER_HEIGHT}px)`,
        }}
      >
        {children}
      </View>
      <AnimatePresence>
        {loading && (
          <MotiView
            from={{ opacity: 0, translateY: 250 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 250 }}
            transition={{ type: 'timing' }}
            style={{
              zIndex: 99,
              alignItems: 'center',
              justifyContent: 'flex-end',
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundImage:
                'linear-gradient(to top,rgb(13, 32, 53), transparent)',
              // backgroundImage:
              //   'radial-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4), transparent, transparent)',
            }}
          >
            <ActivityIndicator
              color="$primary.100"
              size={40}
              sx={{ m: '$5' }}
            />
          </MotiView>
        )}
      </AnimatePresence>
      {/** Desktop floating mystery */}
      <DraggableFloatingMystery />
      <LiveChat />
      <LazyFooter />
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
