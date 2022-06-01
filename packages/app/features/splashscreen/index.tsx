import { Text, View } from 'dripsy'
import { MotiView } from 'moti'
import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native'
import { MotiLink } from 'solito/moti'
import { useRouter } from 'solito/router'
import useOTA from './useOTA'
import useSplashScreen from './useSplashScreen'

const SplashScreen = () => {
  const { push } = useRouter()
  const { isReady } = useOTA()
  const { status } = useSplashScreen({}, isReady, { minWaitTime: 500 })

  useEffect(() => {
    if (status) {
      push('/BottomNav')
    }
  }, [status, push])

  return (
    <View
      sx={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require('../../assets/devicon.png')}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',

          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>This is Splash Screen</Text>
      </ImageBackground>
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
    </View>
  )
}

export default SplashScreen
