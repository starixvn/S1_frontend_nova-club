import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'
import MainHeader from 'app/navigation/MainHeader'
import BottomNavigation from 'app/navigation/BottomNavigation'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
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
