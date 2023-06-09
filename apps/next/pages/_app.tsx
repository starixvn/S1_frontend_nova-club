import 'raf/polyfill'
import 'setimmediate'

import { AvertaStdUseFont } from 'app/assets/fonts/Averta'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import Head from 'next/head'
import type { SolitoAppProps } from 'solito'
import RootPage from '../../../apps/expo/app/rootPage'
import AdaptiveLayout from '../components/layouts/AdaptiveLayout'
import '../global.css'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  useFonts(AvertaStdUseFont)

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
        <AdaptiveLayout>
          <Component {...pageProps} />
          <RootPage />
        </AdaptiveLayout>
      </Provider>
    </>
  )
}

export default MyApp
