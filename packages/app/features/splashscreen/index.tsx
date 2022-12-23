import { useNavigation } from '@react-navigation/native'
import useAlert from 'app/hooks/useAlert'
import useFontInit from 'app/hooks/useFontInit'
import useOrientation, { unlockAsync } from 'app/hooks/useOrientation'
import useCodePushDownload from 'app/integrations/codepush/useCodePush'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Text, View } from 'dripsy'
import { Video } from 'expo-av'
import { MotiView } from 'moti'
import React, { useEffect } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import CodePush from 'react-native-code-push'
import { getVersion } from 'react-native-device-info'
import { Easing } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { useRouter } from 'solito/router'
import CodePushUpdateBar from './CodePushUpdateBar'
import { checkMaintenance, checkVersionUpdated } from './splashScreenChecks'
import useSplashScreen, { useSplashScreenTaskResolver } from './useSplashScreen'

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
    unlockAsync()
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

  const { bottom } = useSafeArea()

  // const { isLandscape } = useOrientation()
  // const { width, height } = useWindowDimensions()

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
              bottom: bottom || 10,
              right: bottom || 10,

              fontWeight: 'bold',
              opacity: 0.8,
            }}
          >
            {currentVersion}
          </Text>
          <PromoText />
        </>
      )}
      {/* <Image
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
      /> */}
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
        resizeMode="cover"
        useNativeControls={false}
      />
    </View>
  )
}

export default SplashScreen

const PromoText = () => {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: 100,
      }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 2000,
        easing: Easing.bezier(0.25, 1, 0.5, 1),
      }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '20%',
      }}
    >
      <Text style={styles.promoLabel}>Đăng ký làm đại lý,</Text>
      <Text style={styles.promoLabel}>
        <Text>
          nhận hoa hồng đến
          <Text sx={{ color: 'gold', fontSize: 30 }}> 0.5%</Text>
        </Text>
      </Text>
    </MotiView>
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
