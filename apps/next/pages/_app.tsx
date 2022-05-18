import 'raf/polyfill'

import useFontInit from 'app/hooks/useFontInit'
import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import { Text } from 'react-native'
import type { SolitoAppProps } from 'solito'
import iconFile from '/public/fonts/icomoon.ttf'
import MainHeader from 'app/navigation/MainHeader'
import BottomNavigation from 'app/navigation/BottomNavigation'
import '../global.css'

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
        <div
          style={{
            maxHeight: '100vh',
            flex: '1 1 0%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MainHeader navigation={undefined} title="Web header" />
          <Component {...pageProps} />
          <BottomNavigation />
        </div>
      </Provider>
    </>
  )
}

export default MyApp
