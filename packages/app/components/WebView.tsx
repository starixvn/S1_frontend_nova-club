import { ActivityIndicator, styled, Text, View } from 'dripsy'
import { useWindowDimensions } from 'react-native'
import { WebView as RWebView } from 'react-native-webview'

const WebView = ({ url }) => {
  const { width, height } = useWindowDimensions()

  return (
    <RWebView
      bounces={false}
      style={{ flex: 1, width: '100%' }}
      source={{
        uri: url,
      }}
      allowsFullscreenVideo
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      scalesPageToFit
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
