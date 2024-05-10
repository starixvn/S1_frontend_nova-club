import WebView from 'app/components/WebView'
import { ROOT_DOMAIN } from 'utils/constant/domain'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useDripsyTheme } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

const plinkoUrl = `${ROOT_DOMAIN}/event/mid-autumn?`

const MidAutumn = () => {
  const { back } = useRouter()
  const loginInfo = useAppSelector((s) => s.auth.info)
  const locale = useAppSelector((s) => s.setting.locale)
  const { top, bottom } = useSafeArea()
  const { theme } = useDripsyTheme()

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
        paddingBottom: bottom,
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

export default MidAutumn
