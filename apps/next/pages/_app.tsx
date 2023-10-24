import 'raf/polyfill'
import 'setimmediate'

import { AvertaStdUseFont } from 'app/assets/fonts/Averta'
import { Provider } from 'app/provider'
import AuthenticationProvider from 'components/AuthenticationProvider'
import { useFonts } from 'expo-font'
import Head from 'next/head'
import AdaptiveLayout, {
  AdaptiveAppProps,
} from '../components/layouts/AdaptiveLayout'
import '../global.css'
import {
  SEO_DESCRIPTION,
  SEO_DOMAIN,
  SEO_IMAGE,
  SEO_KEYWORD,
  SEO_TITLE,
  SEO_TWITTER_CARD,
  SEO_TYPE,
  SEO_URL,
} from 'app/constants/seo'
import Script from 'next/script'

function MyApp({ ...rest }: AdaptiveAppProps) {
  useFonts(AvertaStdUseFont)
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
          content="width=375, initial-scale=1.0,viewport-fit=cover, user-scalable=no, maximum-scale=1 "
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        /> */}
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
        <AuthenticationProvider>
          <AdaptiveLayout {...rest} />
        </AuthenticationProvider>
      </Provider>
    </>
  )
}

export default MyApp
