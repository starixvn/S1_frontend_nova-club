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
          content="width=375, initial-scale=1.0, user-scalable=no, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <AuthenticationProvider>
          <AdaptiveLayout {...rest} />
        </AuthenticationProvider>
      </Provider>
    </>
  )
}

export default MyApp
