import { useAppSelector } from 'app/provider/redux/store'
import { Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native'
import { useRouter } from 'solito/router'
import useOTA from './useOTA'
import useSplashScreen from './useSplashScreen'
import * as ScreenOrientation from 'expo-screen-orientation'
const SplashScreen = () => {
  const { replace } = useRouter()
  const { isReady } = useOTA()
  const { status } = useSplashScreen({}, isReady, { minWaitTime: 2000 })
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
      {/* <Text>This is Splash Screen</Text> */}
      {!isReady && (
        <View
          sx={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MotiView
            animate={{
              opacity: [0, 0.99, { value: 1, delay: 1000 }],
            }}
            transition={{
              loop: true,
              duration: 1000,
            }}
          >
            <Text>Updating...</Text>
          </MotiView>
        </View>
      )}
    </ImageBackground>
  )
}

export default SplashScreen
