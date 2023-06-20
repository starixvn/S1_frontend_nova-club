import useContainerDimension from 'app/hooks/useContainerDimension'
import { ActivityIndicator, styled, Text, View } from 'dripsy'
import { useWindowDimensions } from 'react-native'
import { WebView as RWebView, WebViewProps } from 'react-native-webview'

interface WebViewComponentProps extends WebViewProps {
  url: string
}

const WebView = ({ url, ...restWebViewProps }: WebViewComponentProps) => {
  const { width, height } = useContainerDimension()

  return (
    <RWebView
      bounces={false}
      style={{ flex: 1, width: '100%' }}
      source={{
        uri: url,
      }}
      mediaPlaybackRequiresUserAction
      allowsFullscreenVideo={false}
      allowsInlineMediaPlayback
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      scalesPageToFit
      javaScriptCanOpenWindowsAutomatically
      setSupportMultipleWindows={false}
      textZoom={100}
      startInLoadingState={true}
      renderLoading={() => (
        <StyledLoadingView>
          <ActivityIndicator size={20} color={'white'} />
        </StyledLoadingView>
      )}
      onError={(e) => console.log('Error loading game', e)}
      renderError={() => (
        <StyledLoadingView>
          <Text sx={{ color: 'white', fontSize: 20 }}>Error Loading Game</Text>
        </StyledLoadingView>
      )}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent
        console.warn('WebView received error status code: ', nativeEvent)
      }}
      {...restWebViewProps}
    />
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

export default WebView
