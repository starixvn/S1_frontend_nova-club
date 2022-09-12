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
import Branch from '../integrations/Branch'
import Shield from '../scripts/Shield'

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
        <Branch />
        <Shield />

        <Container sx={{ flex: 1 }}>
          <AuthenticationProvider>
            {getLayout(<Component {...pageProps} />)}
          </AuthenticationProvider>
        </Container>
      </Provider>
      {/* <Script src="/js/iovation_static.js" /> */}
      <Script src="https://scqa2.detecas.com/activator.ashx" />
      {/* <Script
        id="LiveChat"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
          window.__lc = window.__lc || {};
          window.__lc.license = 14440122;
          ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
          `,
        }}
      /> */}
    </>
  )
}

export default MyApp
