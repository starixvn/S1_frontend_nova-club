import AppDownloadSuggestion from 'app/components/AppDownloadSuggestion'
import BottomNavigation from 'app/navigation/BottomNavigation'
import MainHeader from 'app/navigation/MainHeader'
import { ActivityIndicator, useSx, View } from 'dripsy'
import { AnimatePresence, MotiView } from 'moti'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { Platform } from 'react-native'

export type TabLayoutProps = {
  children: React.ReactElement
  lockHeight?: boolean
}

const TabLayout: FC<TabLayoutProps> = ({ children, lockHeight }) => {
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

  const sx = useSx()
  const s = sx({
    height: 'header',
  })

  const heightStyle = lockHeight ? { height: '100vh' } : { minHeight: '100vh' }

  return (
    <View
      sx={{
        ...heightStyle,
        paddingTop: s.height,
        paddingBottom: 60,
        position: 'relative',
      }}
    >
      <HeaderFloat />
      {children}
      {/* <AnimatePresence
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        {children}
      </AnimatePresence> */}
      <BottomTabFloat />
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
    </View>
  )
}

const HeaderFloat = ({}) => {
  return (
    <View
      sx={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        maxWidth: 'container',
        top: 0,
      }}
    >
      <AppDownloadSuggestion />
      <MainHeader />
    </View>
  )
}

const BottomTabFloat = () => {
  return (
    <View
      sx={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        bottom: 0,
        maxWidth: 'container',
      }}
    >
      <BottomNavigation />
    </View>
  )
}

const QRFloat = () => {
  return (
    <View
      sx={{
        position: 'fixed',
        zIndex: 1,
        maxWidth: 'container',
        top: '20%',
        right: 0,
        bg: 'red',
      }}
    >
      <View sx={{ height: 100, width: 100 }} />
    </View>
  )
}
export default TabLayout
