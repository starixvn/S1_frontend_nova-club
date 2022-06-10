import 'raf/polyfill'
import useFontInit from 'app/hooks/useFontInit'
import { Provider } from 'app/provider'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import '../global.css'
import CommonLayout from '../layouts/commonLayout'
import iconFile from '/public/icomoon.ttf'

import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }: SolitoAppProps) {
  const [loaded, error] = useFontInit({
    iconUrl: iconFile,
  })

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || CommonLayout

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
      <div className="container">
        <Provider>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            {getLayout(<Component {...pageProps} />)}
          </AnimatePresence>
        </Provider>
      </div>

      <Script src="/js/iovation_static.js" />
      <Script src="https://scqa2.detecas.com/activator.ashx" />
    </>
  )
}

export default MyApp
