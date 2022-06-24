import { Image, Text, View } from 'dripsy'
import React, { useEffect, useState, useRef } from 'react'
import { Platform } from 'react-native'
import { WebView } from 'react-native-webview'

const ThirdPartyDepositLoader = ({ navigation }) => {
  const [url, setUrl] = useState(navigation.getParam('url'))
  const [html, setHtml] = useState(navigation.getParam('html'))
  console.log('HTML Log\n', html)
  useEffect(() => {
    const newUrl = navigation.getParam('url')
    const newHtml = navigation.getParam('html')
    const callback = navigation.getParam('onBack', null)
    const error = navigation.getParam('error')
    if (newUrl) {
      setUrl(newUrl)
    }

    if (newHtml) {
      setHtml(newHtml)
    }

    if (error) {
      navigation.goBack()
    }

    if (callback) return callback
  }, [navigation.state])

  const INJECTED_JAVASCRIPT = `(function() {
    var cancelOrderBtn = document.getElementById('cancelOrderBtn');
    cancelOrderBtn.onclick = function() { window.ReactNativeWebView.postMessage("Cancel Order Button Clicked!"); };
  })();`

  if (!html && !url) {
    return (
      // <LoadingScreen gameCategory={'deposit'}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={
            Platform.OS === 'ios'
              ? require('../../../assets/images/loading.gif')
              : require('../../../assets/images/loading-android.gif')
          }
          style={{ width: 70, height: 70 }}
          // style={{ width: getScaledSize(70), height: getScaledSize(70) }}
        />
      </View>
      // </LoadingScreen>
    )
  }

  if (html && html.message) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{html.message}</Text>
      </View>
    )
  }

  return (
    <WebView
      textZoom={100}
      source={html && !html.code ? { html } : { uri: url }}
      style={{ flex: 1, marginBottom: Platform.OS === 'ios' ? 30 : 0 }}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onMessage={() => navigation.goBack()} //  message returning is the injected javascript from this qr pay page, close this page immediately when receive
      startInLoadingState
      renderLoading={() => (
        // <LoadingScreen gameCategory={'deposit'}>
        <View
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={
              Platform.OS === 'ios'
                ? require('../../../assets/images/loading.gif')
                : require('../../../assets/images/loading-android.gif')
            }
            sx={{ width: 70, height: 70 }}
            // sx={{ width: getScaledSize(70), height: getScaledSize(70) }}
          />
        </View>
        // </LoadingScreen>
      )}
    />
  )
}

export default ThirdPartyDepositLoader

// ThirdPartyDepositLoader.navigationOptions = ({ navigation }) => {
//   return {
//     header: (props) => (
//       <BasicHeader
//         title={navigation.getParam('title', '')}
//         navigation={navigation}
//       />
//     ),
//   }
// }
