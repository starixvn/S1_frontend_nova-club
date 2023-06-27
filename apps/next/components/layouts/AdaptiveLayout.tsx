import { useEffect, useMemo, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import type { SolitoAppProps } from 'solito'

import useAppState from 'app/hooks/appState/useAppState'
import useOnAppStart from 'app/hooks/useOnAppStart'
import { useRouter } from 'next/router'
import { DesktopBaseLayout } from './desktop'
import { MobileBaseLayout } from './mobile'

export type NavigationOptions = SolitoAppProps['Component']['navigationOptions']
export type AdaptiveAppProps<P = {}> = Omit<SolitoAppProps<P>, 'Component'> & {
  Component: SolitoAppProps<P>['Component'] & {
    navigationOptions: NavigationOptions
    MobileLayout?: React.FC
    DesktopLayout?: React.FC
  }
}

export default function AdaptiveLayout({
  Component,
  pageProps,
}: AdaptiveAppProps) {
  const [isClientReady, setClientReady] = useState<boolean>()
  const router = useRouter()

  const { width } = useWindowDimensions()
  useAppState()
  useOnAppStart()

  /* TODO: Split width and router as 2 seperate rerender */
  const BaseLayout = useMemo(() => {
    if (!isClientReady) return
    document.getElementsByTagName('body')[0].classList.add('rendered')

    if (window.innerWidth < 992) {
      return Component.MobileLayout || MobileBaseLayout
    } else return Component.DesktopLayout || DesktopBaseLayout
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

  return (
    <div id="al">
      {/* <ActivityIndicator /> */}
      {BaseLayout && (
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      )}
    </div>
  )
}
