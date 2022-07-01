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

function MyApp({ Component, pageProps, router }: SolitoAppProps) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || layouts.COMMON()

  return (
    <>
      <Head>
        <title>Nova88 Club</title>
        <meta name="description" content="Nova88 Club" />
        <meta
          name="viewport"
          content="width=375, initial-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <AuthenticationProvider>
          <Container sx={{ flex: 1 }}>
            {getLayout(<Component {...pageProps} />)}
          </Container>
        </AuthenticationProvider>
      </Provider>

      {/* <Script src="/js/iovation_static.js" /> */}
      <Script src="https://scqa2.detecas.com/activator.ashx" />
    </>
  )
}

export default MyApp
