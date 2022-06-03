import useFontInit from 'app/hooks/useFontInit'
import { Provider } from 'app/provider'
import Head from 'next/head'
import Script from 'next/script'
import 'raf/polyfill'
import React from 'react'
import { Text } from 'react-native'
import type { SolitoAppProps } from 'solito'
import '../global.css'
import CommonLayout from '../layouts/commonLayout'
import iconFile from '/public/fonts/icomoon.ttf'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const [loaded, error] = useFontInit({
    iconUrl: iconFile,
  })

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || CommonLayout

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
          {getLayout(<Component {...pageProps} />)}
        </div>
      </Provider>

      <Script src="/js/iovation_static.js" />
      <Script src="https://scqa2.detecas.com/activator.ashx" />
    </>
  )
}

export default MyApp
