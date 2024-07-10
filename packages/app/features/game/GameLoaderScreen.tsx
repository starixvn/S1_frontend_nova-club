import { PageWithBackHeader } from 'app/components/layouts/Page'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ActivityIndicator, Text, View, styled } from 'dripsy'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { useLazyPlayerBalanceQuery } from 'services/walletApi'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { ROOT_DOMAIN } from 'utils/constant/domain'
import { gameEncodedHtml } from './GameLauncher'

type Props = {}

const { useParam } = createParam<{
  url?: string
  html?: string
  title: string
  providerCode: string
}>()

export default function GameLoaderScreen({}: Props) {
  const { left, right } = useSafeArea()
  const [url] = useParam('url')
  // const [html] = useParam('html')
  const [title] = useParam('title')
  const [trigger] = useLazyPlayerBalanceQuery()
  const { back } = useRouter()

  useEffect(() => {
    ScreenOrientation.unlockAsync()
    return () => {
      trigger()
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }
  }, [trigger])

  return (
    <View
      sx={{
        flex: 1,
        bg: '$primary.500',
        paddingLeft: left,
        paddingRight: right,
      }}
    >
      <PageWithBackHeader header={{ title: title ?? 'Game' }} disableScrollView>
        <WebView
          bounces={false}
          style={{ flex: 1, width: '100%' }}
          source={
            url
              ? { uri: url }
              : gameEncodedHtml
              ? { html: gameEncodedHtml }
              : undefined
          }
          mediaPlaybackRequiresUserAction
          allowsFullscreenVideo={false}
          allowsInlineMediaPlayback
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          scalesPageToFit
          javaScriptCanOpenWindowsAutomatically
          setSupportMultipleWindows={false}
          textZoom={100}
          onShouldStartLoadWithRequest={(e) => {
            if (e.url === ROOT_DOMAIN) {
              back()
              return false
            }
            return true
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <StyledLoadingView>
              <ActivityIndicator size={20} color={'white'} />
            </StyledLoadingView>
          )}
          onError={(e) => console.log('Error loading game', e)}
          renderError={() => (
            <StyledLoadingView>
              <Text sx={{ color: 'white', fontSize: 20 }}>
                Error Loading Game
              </Text>
            </StyledLoadingView>
          )}
        />
      </PageWithBackHeader>
    </View>
  )
}

const StyledLoadingView = styled(View)({
  position: 'absolute',
  top: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$secondary',
  height: '100%',
  width: '100%',
})
