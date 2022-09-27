import { useNavigation } from '@react-navigation/native'
import useAlert from 'app/hooks/useAlert'
import useFontInit from 'app/hooks/useFontInit'
import useCodePushDownload from 'app/integrations/codepush/useCodePush'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Text } from 'dripsy'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ImageBackground } from 'react-native'
import CodePush from 'react-native-code-push'
import { getVersion } from 'react-native-device-info'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import { sleep } from 'utils/common'
import CodePushUpdateBar from './CodePushUpdateBar'
import { checkMaintenance, checkVersionUpdated } from './splashScreenChecks'
import useSplashScreen, {
  SplashScreenTask,
  SplashScreenHandler,
  useSplashScreenTaskResolver,
} from './useSplashScreen'

function useFontInitWithPromise() {
  const resolver = useSplashScreenTaskResolver(useFontInit)
  const {
    hookValue: [fontsLoaded],
    promiseFactory,
    resolve,
  } = resolver

  useEffect(() => {
    if (fontsLoaded) {
      resolve({
        result: true,
      })
    }
  }, [fontsLoaded, resolve])

  return { fontsLoaded, promiseFactory }
}

const SplashScreen = () => {
  const { fontsLoaded, promiseFactory: fontInitPromiseFactory } =
    useFontInitWithPromise()
  const { t } = useLocalization()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { showAlert } = useAlert()
  const { replace } = useRouter()
  const currentVersion = getVersion()
  // const { isReady } = useOTA()
  const { status: codePushStatus, progress } = useCodePushDownload()
  const { status } = useSplashScreen(
    {
      mandatorySync: [checkVersionUpdated, checkMaintenance], // TODO : implement check maintenane logic
      mandatoryAsync: [fontInitPromiseFactory],
    },
    codePushStatus === CodePush.SyncStatus.UP_TO_DATE,
    {
      minWaitTime: 2000,
      context: {
        dispatch,
        t,
        navigation,
        showAlert,
      },
    }
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
      {fontsLoaded && (
        <>
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
        </>
      )}
    </ImageBackground>
  )
}

export default SplashScreen
