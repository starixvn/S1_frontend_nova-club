import 'raf/polyfill'
import React from 'react'
import {
  SEO_DESCRIPTION,
  SEO_DOMAIN,
  SEO_IMAGE,
  SEO_KEYWORD,
  SEO_TITLE,
  SEO_TWITTER_CARD,
  SEO_TYPE,
  SEO_URL,
} from 'app/constant/seo'
import useFontInit from 'app/hooks/useFontInit'
import { Provider } from 'app/provider'
import { Container } from 'dripsy'
import Head from 'next/head'
import Script from 'next/script'
import type { SolitoAppProps } from 'solito'
import AuthenticationProvider from '../components/AuthenticationProvider'
import '../global.css'
import Branch from '../integrations/Branch'
import layouts from '../layouts'
import Shield from '../scripts/Shield'

function MyApp({ Component, pageProps, router }: SolitoAppProps) {
  const getLayout = Component.getLayout || layouts.COMMON()
  useFontInit()

  return (
    <>
      <Head>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <meta name="keywords" content={SEO_KEYWORD} />
        <meta property="og:url" content={SEO_URL} />
        <meta property="og:type" content={SEO_TYPE} />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESCRIPTION} />
        <meta property="og:image" content={SEO_IMAGE} />
        <meta name="twitter:card" content={SEO_TWITTER_CARD} />
        <meta property="twitter:domain" content={SEO_DOMAIN} />
        <meta property="twitter:url" content={SEO_URL} />
        <meta name="twitter:title" content={SEO_TITLE} />
        <meta name="twitter:description" content={SEO_DESCRIPTION} />
        <meta name="twitter:image" content={SEO_IMAGE} />
        <meta
          name="viewport"
          content="width=375, initial-scale=1.0, user-scalable=no, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5NXZ9QR');
        `}
      </Script>
      <Provider>
        <Branch />
        <Shield />

        <Container sx={{ flex: 1 }}>
          <AuthenticationProvider>
            {/* <AnimatePresence exitBeforeEnter={false} initial={false}> */}
            {getLayout(<Component {...pageProps} />)}
            {/* </AnimatePresence> */}
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
