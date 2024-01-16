import { Text, View } from 'dripsy'
import React, { useEffect } from 'react'

import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { getVersion } from 'react-native-device-info'
import useSplashScreen from './useSplashScreen'

import { useNavigation } from '@react-navigation/native'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { ResizeMode, Video } from 'expo-av'
// import { MotiView } from 'moti'
import { useCodePush } from 'app/provider/CodePushProvider'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { StyleSheet } from 'react-native'
import CodePush from 'react-native-code-push'
import { useRouter } from 'solito/router'
import CodePushUpdateBar from './CodePushUpdateBar'
import { checkMaintenance, checkVersionUpdated } from './splashScreenChecks'

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
      // if (loginResult?.token) {
      //   replace('/')
      // } else if (agentToken) {
      //   handleAgentLogin()
      // } else
      // console.log('test')
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

  //clear token/logout first
  // useEffect(() => {
  //   LogOut()
  // }, [])
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
          // width: '100%',
          // height: Math.max(
          //   width / (isLandscape ? 2047 / 2732 : 1242 / 2208),
          //   height
          // ),
        }}
        source={require('app/assets/videos/vui123-splash.mp4')}
        resizeMode={ResizeMode.COVER}
        useNativeControls={false}
      />
    </View>
  )
}

// const PromoText = () => {
//   return (
//     <MotiView
//       from={{
//         opacity: 0,
//         translateY: 100,
//       }}
//       animate={{ translateY: 0, opacity: 1 }}
//       transition={{
//         type: 'timing',
//         duration: 2000,
//         easing: Easing.bezier(0.25, 1, 0.5, 1),
//       }}
//       style={{
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: '20%',
//       }}
//     >
//       <Text style={styles.promoLabel}>Đăng ký làm đại lý,</Text>
//       <Text style={styles.promoLabel}>
//         <Text>
//           nhận hoa hồng đến
//           <Text sx={{ color: 'gold', fontSize: 30 }}> 0.5%</Text>
//         </Text>
//       </Text>
//     </MotiView>
//   )
// }

const styles = StyleSheet.create({
  promoLabel: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
})
