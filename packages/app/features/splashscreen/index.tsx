import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native'
import { useRouter } from 'solito/router'
import CodePush from 'react-native-code-push'
import useSplashScreen from './useSplashScreen'
import * as ScreenOrientation from 'expo-screen-orientation'
import useCodePushDownload from 'app/integrations/codepush/useCodePush'
import CodePushUpdateBar from './CodePushUpdateBar'
import useOnAppStart from 'app/hooks/useOnAppStart'

const SplashScreen = () => {
  useOnAppStart()

  const { replace } = useRouter()
  // const { isReady } = useOTA()
  const { status: codePushStatus, progress } = useCodePushDownload()
  const { status } = useSplashScreen(
    {},
    codePushStatus === CodePush.SyncStatus.UP_TO_DATE,
    { minWaitTime: 2000 }
  )

  const loginResult = useAppSelector((state) => state.auth.info)

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }, [])

  useEffect(() => {
    if (status) {
      if (loginResult) {
        replace('/')
        return
      }
      replace('/auth/login')
    }
  }, [status, replace, loginResult])

  return (
    <ImageBackground
      source={require('../../assets/images/splashscreen.jpg')}
      resizeMode="cover"
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {codePushStatus === CodePush.SyncStatus.DOWNLOADING_PACKAGE && (
        <CodePushUpdateBar progress={progress} />
      )}
    </ImageBackground>
  )
}

export default SplashScreen
