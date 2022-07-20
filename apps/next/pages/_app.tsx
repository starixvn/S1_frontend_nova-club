import 'raf/polyfill'
import { Provider } from 'app/provider'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import '../global.css'
import { Container } from 'dripsy'

import { AnimatePresence } from 'framer-motion'
import layouts from '../layouts'
import TabLayout from '../layouts/TabLayout'
import AuthenticationProvider from '../components/AuthenticationProvider'
import useFontInit from 'app/hooks/useFontInit'

function MyApp({ Component, pageProps, router }: SolitoAppProps) {
  const getLayout = Component.getLayout || layouts.COMMON()
  useFontInit()

  return (
    <>
      <Head>
        <title>Vui 123</title>
        <meta name="description" content="Vui 123" />
        <meta
          name="viewport"
          content="width=375, initial-scale=1.0, user-scalable=no, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Container sx={{ flex: 1 }}>
          <AuthenticationProvider>
            {getLayout(<Component {...pageProps} />)}
          </AuthenticationProvider>
        </Container>
      </Provider>

      {/* <Script src="/js/iovation_static.js" /> */}
      <Script src="https://scqa2.detecas.com/activator.ashx" />
    </>
  )
}

export default MyApp
