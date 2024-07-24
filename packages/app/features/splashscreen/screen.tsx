import { Text, View } from 'dripsy'
import React, { useEffect } from 'react'

import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { getVersion } from 'react-native-device-info'
import useSplashScreen from './useSplashScreen'

import { useNavigation } from '@react-navigation/native'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { Audio, ResizeMode, Video } from 'expo-av'
// import { MotiView } from 'moti'
import { useCodePush } from 'app/provider/CodePushProvider'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { StyleSheet } from 'react-native'
import CodePush from 'react-native-code-push'
import { useRouter } from 'solito/router'
import CodePushUpdateBar from './CodePushUpdateBar'
import { checkMaintenance, checkVersionUpdated } from './splashScreenChecks'

/* https://github.com/expo/expo/issues/5472#issuecomment-1123485723
   fix on IOS : [Error: Play encountered an error: audio session not activated.]
*/
Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  playsInSilentModeIOS: true,
})

export default function SplashScreen() {
  const dispatch = useAppDispatch()
  const { showAlert } = useAlert()

  const { replace } = useRouter()

  const { t } = useLocalization()
  const navigation = useNavigation()
  const currentVersion = getVersion()
  const {
    status: codePushStatus,
    progress,
    isCodePushReady,
    isCodePushSkipAble,
  } = useCodePush()

  const showCodePushDownload =
    !isCodePushSkipAble &&
    codePushStatus === CodePush.SyncStatus.DOWNLOADING_PACKAGE

  const { status } = useSplashScreen(
    {
      mandatorySync: [checkVersionUpdated, checkMaintenance],
    },
    isCodePushReady,
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

  const { top, bottom } = useSafeArea()
  // const { replace } = useRouter()

  useEffect(() => {
    if (status) {
      dispatch(TempSettingActions.setSplashScreenLoaded(true))
      replace('/', undefined, {
        experimental: {
          nativeBehavior: 'stack-replace',
          isNestedNavigator: false,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <View sx={{ flex: 1, bg: '$primary.500' }}>
      {showCodePushDownload && <CodePushUpdateBar progress={progress} />}
      <Text
        sx={{
          color: 'white',
          position: 'absolute',
          bottom: 25,
          right: bottom || 10,
          fontWeight: 'bold',
          opacity: 0.8,
        }}
      >
        {currentVersion}
      </Text>
      <Video
        isLooping={false}
        isMuted
        shouldPlay
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
        source={require('app/assets/videos/olympic-splash.mp4')}
        resizeMode={ResizeMode.COVER}
        useNativeControls={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  promoLabel: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
})
