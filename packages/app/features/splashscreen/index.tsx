import { useNavigation } from '@react-navigation/native'
import useAlert from 'app/hooks/useAlert'
import useFontInit from 'app/hooks/useFontInit'
import useOrientation from 'app/hooks/useOrientation'
import useCodePushDownload from 'app/integrations/codepush/useCodePush'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, ImageBackground, useWindowDimensions } from 'react-native'
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
    ScreenOrientation.unlockAsync()
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

  const { isLandscape } = useOrientation()
  const { width, height } = useWindowDimensions()

  return (
    <View sx={{ flex: 1 }}>
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
      <Image
        source={
          isLandscape
            ? require('../../assets/images/splashscreen_tablet.jpg')
            : require('../../assets/images/splashscreen.jpg')
        }
        resizeMode="cover"
        style={{
          position: 'absolute',
          zIndex: -1,
          width: '100%',
          height: Math.max(
            width / (isLandscape ? 2047 / 2732 : 1242 / 2208),
            height
          ),
        }}
      />
    </View>
  )
}

export default SplashScreen
