import { Text, View } from 'dripsy'
import React, { useEffect } from 'react'

import useFontInit from 'app/hooks/useFontInit'
import useCodePushDownload from 'app/integrations/codepush/useCodePush'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { getVersion } from 'react-native-device-info'
import useSplashScreen, { useSplashScreenTaskResolver } from './useSplashScreen'

import { useNavigation } from '@react-navigation/native'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppDispatch } from 'app/provider/redux/store'
import { Video, ResizeMode } from 'expo-av'
// import { MotiView } from 'moti'
import { StyleSheet } from 'react-native'
import CodePush from 'react-native-code-push'
import { Easing } from 'react-native-reanimated'
import CodePushUpdateBar from './CodePushUpdateBar'
import { useRouter } from 'solito/router'
import { TempSettingActions } from 'app/store/tempSetting.slice'
import { checkMaintenance, checkVersionUpdated } from './splashScreenChecks'

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
  }, [fontsLoaded])

  return { fontsLoaded, promiseFactory }
}

export default function SplashScreen() {
  const { fontsLoaded, promiseFactory: fontInitPromiseFactory } =
    useFontInitWithPromise()

  const dispatch = useAppDispatch()
  const { showAlert } = useAlert()

  const { replace } = useRouter()

  const { t } = useLocalization()
  const navigation = useNavigation()
  const currentVersion = getVersion()
  const { status: codePushStatus, progress } = useCodePushDownload()

  const { status } = useSplashScreen(
    {
      mandatorySync: [checkVersionUpdated, checkMaintenance],
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
      {fontsLoaded && (
        <>
          {codePushStatus === CodePush.SyncStatus.DOWNLOADING_PACKAGE && (
            <CodePushUpdateBar progress={progress} />
          )}
          <Text
            sx={{
              color: 'white',
              position: 'absolute',
              bottom: bottom || 10,
              right: bottom || 10,
              fontWeight: 'bold',
              opacity: 0.8,
            }}
          >
            {currentVersion}
          </Text>
          {/* <PromoText /> */}
        </>
      )}
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
