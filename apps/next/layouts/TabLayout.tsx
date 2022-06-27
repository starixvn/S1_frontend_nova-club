import BottomNavigation from 'app/navigation/BottomNavigation'
import MainHeader from 'app/navigation/MainHeader'
import React, { FC, useEffect, useState } from 'react'
import { View, useSx } from 'dripsy'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'

export interface TabLayoutProps {
  children: React.ReactElement
}

const TabLayout: FC<TabLayoutProps> = ({ children }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState()

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true)
    const handleComplete = (url) => {
      // console.log('completed', url, router.asPath)
      // setUrl(url)
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
  return (
    <View
      sx={{
        minHeight: '100vh',
        marginTop: s.height,
        marginBottom: 60,
        position: 'relative',
      }}
    >
      {/* {loading && (
        <div style={{ width: 100, height: 100, backgroundColor: 'red' }}></div>
      )} */}
      <HeaderFloat />
      <View style={{ flex: 1 }}>{children}</View>
      {/* <AnimatePresence
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        {children}
      </AnimatePresence> */}
      <BottomTabFloat />
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

export default TabLayout
