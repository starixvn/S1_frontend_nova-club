import { useAppSelector } from 'app/provider/redux/store'
import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native'
import { getVersion } from 'react-native-device-info'
import { useRouter } from 'solito/router'
import CodePush from 'react-native-code-push'
import useSplashScreen from './useSplashScreen'
import * as ScreenOrientation from 'expo-screen-orientation'
import useCodePushDownload from 'app/integrations/codepush/useCodePush'
import CodePushUpdateBar from './CodePushUpdateBar'
import { Text } from 'dripsy'
import { getBottomSpace } from 'react-native-iphone-x-helper'

const SplashScreen = () => {
  const { replace } = useRouter()
  const currentVersion = getVersion()
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
      <Text
        sx={{
          color: 'white',
          position: 'absolute',
          bottom: getBottomSpace() || 10,
          right: getBottomSpace() || 10,
          fontWeight: 'bold',
          opacity: 0.8,
        }}
      >
        {currentVersion}
      </Text>
    </ImageBackground>
  )
}

export default SplashScreen
