import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, View, useWindowDimensions } from 'react-native'

import dynamic from 'next/dynamic'
import { Provider } from 'app/provider'
import BottomTabBar from 'app/components/navigation/BottomTabBar'

const DesktopBaseLayout = dynamic(() => import('./DesktopBaseLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

const MobileBaseLayout = dynamic(() => import('./MobileBaseLayout'), {
  loading: () => <ActivityIndicator />,
  ssr: false,
})

export default function AdaptiveLayout({ children }: { children: ReactNode }) {
  const [isClientReady, setClientReady] = useState<boolean>()

  const { width } = useWindowDimensions()

  const BaseLayout = useMemo(() => {
    if (!isClientReady) return
    document.getElementsByTagName('body')[0].classList.add('rendered')

    if (window.innerWidth < 1024) {
      return MobileBaseLayout
    } else return DesktopBaseLayout
  }, [isClientReady, width])

  useEffect(() => {
    setClientReady(true)
  }, [])

  // const w = useAdaptiveLayout()
  // console.log('rerender')
  // useEffect(() => {
  //   document.getElementsByTagName('body')[0].classList.add('rendered')

  //   if (window.innerWidth < 1024) {
  //     setBaseLayout(MobileBaseLayout)
  //   } else setBaseLayout(DesktopBaseLayout)
  // }, [])

  // const cachedRoot = useMemo(() => children, [])

  return (
    <div id="al">
      {/* <ActivityIndicator /> */}
      <Provider>{BaseLayout && <BaseLayout>{children}</BaseLayout>}</Provider>
    </div>
  )
}
