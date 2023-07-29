import 'raf/polyfill'
import 'setimmediate'

import { AvertaStdUseFont } from 'app/assets/fonts/Averta'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import useOnAppStart from 'app/hooks/useOnAppStart'
import Head from 'next/head'
import AdaptiveLayout, {
  AdaptiveAppProps,
} from '../components/layouts/AdaptiveLayout'
import '../global.css'
import AuthenticationProvider from 'components/AuthenticationProvider'
import Shield from 'script/Shield'

function MyApp({ ...rest }: AdaptiveAppProps) {
  useFonts(AvertaStdUseFont)
  return (
    <>
      <Head>
        <title>Vui 123</title>
        <meta name="description" content="description" />
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
