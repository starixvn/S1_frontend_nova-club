import 'raf/polyfill'

import useFontInit from 'app/hooks/useFontInit'
import BottomNavigation from 'app/navigation/BottomNavigation'
import MainHeader from 'app/navigation/MainHeader'
import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import { Text } from 'react-native'
import type { SolitoAppProps } from 'solito'
import iconFile from '/public/fonts/icomoon.ttf'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const [loaded, error] = useFontInit({
    iconUrl: iconFile,
  })

  if (!loaded) {
    return <Text>log from _app.tsx: Loading... {JSON.stringify(error)}</Text>
  }

  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <meta name="viewport" content="width=375, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <MainHeader navigation={undefined} title="Web header" />
        <Component {...pageProps} />
        <BottomNavigation />
      </Provider>
    </>
  )
}

export default MyApp
