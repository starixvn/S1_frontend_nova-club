import { ActivityIndicator } from 'dripsy'
import { AnimatePresence } from 'framer-motion'
import { MotiView } from 'moti'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function NavigationLoading() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

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
          }}
        >
          <ActivityIndicator color="white" size={40} sx={{ m: '$5' }} />
        </MotiView>
      )}
    </AnimatePresence>
  )
}
