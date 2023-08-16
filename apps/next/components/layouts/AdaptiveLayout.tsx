import { useEffect, useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import type { SolitoAppProps } from 'solito'

import SessionHandler from 'app/components/SessionHandler'

import { View } from 'dripsy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DesktopBaseLayout } from './desktop'

export type NavigationOptions = SolitoAppProps['Component']['navigationOptions']

export type Layout = (node: JSX.Element) => JSX.Element

interface AdaptiveLayout {
  MobileLayout?: Layout
  DesktopLayout?: Layout
  AgentLayout?: Layout
}

export type AdaptiveAppProps<P = {}> = Omit<SolitoAppProps<P>, 'Component'> & {
  Component: SolitoAppProps<P>['Component'] &
    AdaptiveLayout & {
      navigationOptions: NavigationOptions
    }
}

export type AdaptiveLayoutPage<P = {}, IP = P> = NextPage<P, IP> &
  AdaptiveLayout

export default function AdaptiveLayout({
  Component,
  pageProps,
}: AdaptiveAppProps) {
  const [isClientReady, setClientReady] = useState<boolean>()
  const router = useRouter()

  const { width } = useWindowDimensions()

  /* TODO: Split width and router as 2 seperate rerender */
  const getLayout = useMemo((): ((node: JSX.Element) => JSX.Element) => {
    // eslint-disable-next-line react/display-name
    if (!isClientReady) return () => <View />
    document.getElementsByTagName('body')[0].classList.add('rendered')

    const path = window.location.pathname

    if (path.includes('/agent')) {
      return typeof Component.AgentLayout === 'function'
        ? Component.AgentLayout
        : (node: JSX.Element) => node
    } else if (window.innerWidth < 992) {
      return typeof Component.MobileLayout === 'function'
        ? Component.MobileLayout
        : (node: JSX.Element) => node
    } else {
      return typeof Component.DesktopLayout === 'function'
        ? Component.DesktopLayout
        : DesktopBaseLayout
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClientReady, width, router])

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

  const page = <Component {...pageProps} />
  const content = getLayout ? getLayout(page) : null

  return (
    <div id="al" style={{ overflowX: 'hidden' }}>
      <SessionHandler />
      {/* <ActivityIndicator /> */}
      {content}
    </div>
  )
}
