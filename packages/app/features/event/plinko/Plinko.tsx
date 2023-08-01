import { DEV_DOMAIN } from '@env'
import WebView from 'app/components/WebView'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useDripsyTheme } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { useRouter } from 'solito/router'

// const plinkoUrl = `https://stage2.gball8.com/event/plinko?`
const plinkoUrl = `https://stage2.gball8.com/event/plinko?`

const Plinko = () => {
  const { back } = useRouter()
  const loginInfo = useAppSelector((s) => s.auth.info)
  const locale = useAppSelector((s) => s.setting.locale)
  const { top } = useSafeArea()
  const { theme } = useDripsyTheme()
  const { height } = useWindowDimensions()

  const GenerateParam = () => {
    const tempUrl = new URLSearchParams(plinkoUrl)

    if (loginInfo?.token && loginInfo?.playerName) {
      tempUrl.append('token', loginInfo?.token)
      tempUrl.append('username', loginInfo?.playerName)
    }
    tempUrl.append('lang', locale)
    return plinkoUrl + tempUrl.toString()
  }

  const onMessage = (e) => {
    if (e.nativeEvent.data === 'back') {
      back()
    }
  }
  const url = GenerateParam()

  return (
    <WebView
      onMessage={onMessage}
      url={url}
      startInLoadingState
      containerStyle={{
        paddingTop: top,
        backgroundColor: theme.colors
          ? theme.colors.$primary[700]
          : 'transparent',
      }}
      incognito={true}
      thirdPartyCookiesEnabled={false}
      domStorageEnabled={false}
      geolocationEnabled={false}
      style={{ backgroundColor: 'transparent' }}
    />
  )
}

export default Plinko
