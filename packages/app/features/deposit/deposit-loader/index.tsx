import { DEV_DOMAIN } from '@env'
import { PageWithBackHeader } from 'app/components/layout/Page'
import WebView from 'app/components/WebView'
import { View } from 'dripsy'
import { Platform } from 'react-native'
import { createParam } from 'solito'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'

const { useParam } = createParam<{ depositUrl: string; title: string }>()
/**
 * `useParam` from solito have different behaviour in web and mobile app.
 * In web, `useParam` will return the original param value shown exactly
 * in the browser url. However in mobile, it will return decoded param value
 * that passed to `DepositLoaderScreen`. Hence, in web have
 * to use `decodeURIComponent` before passing to `iframe` url.
 *
 * React navigation by befault will automatically decode the url param value
 * by using `query-string` library. This is the link to source code where
 * the process of decoding the param value happened.
 * https://rli.to/24lzd
 *
 * @example
 * ```js
 * const depositUrl = 'https%3A%2F%2Fwww.google.com%3Ftext%3Dhello%20world'
 * const [depositUrl] = useParam('depositUrl', { initial: '' })
 *
 * console.log(depositUrl)
 * // Web: 'https%3A%2F%2Fwww.google.com%3Ftext%3Dhello%20world'
 * // Mobile: 'https://www.google.com?text=hello world'
 * ```
 */
const DepositLoaderScreen = () => {
  const [depositUrl] = useParam('depositUrl', { initial: '' })
  const [title] = useParam('title')
  const { back } = useContextualRouter()

  const handleNavigation = (event) => {
    const { src } = event.target
    console.log(src)
  }

  return (
    <PageWithBackHeader header={{ title: title }} disableScrollView>
      <View sx={{ flex: 1 }}>
        {Platform.OS === 'web' ? (
          <iframe
            src={decodeURIComponent(depositUrl)}
            height="100%"
            style={{ flex: 1 }}
            onLoad={handleNavigation}
          />
        ) : (
          <WebView
            url={depositUrl}
            onShouldStartLoadWithRequest={(e) => {
              const { url } = e
              if (url.startsWith(DEV_DOMAIN)) {
                back()
                return false
              }

              console.log('onShouldStartLoadWithRequest', e)
              return true
            }}
          />
        )}
      </View>
    </PageWithBackHeader>
  )
}

export default DepositLoaderScreen
