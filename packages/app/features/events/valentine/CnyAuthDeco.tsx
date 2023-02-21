import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, View } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
const CnyAuthDeco = () => {
  const { height } = useWindowDimensions()
  const { top, bottom } = useSafeArea()

  return (
    <>
      <View
        pointerEvents="none"
        sx={{
          height: 50,
          width: 100,
          left: -25,
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/cloud.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          left: -15,
          position: 'absolute',
          bottom: height * 0.03,
          zIndex: 0,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 115,
          left: -40,
          position: 'absolute',
          bottom: height * 0.45,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/cloud-gold.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          left: 0,
          position: 'absolute',
          top: 0 + top,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View
        pointerEvents="none"
        sx={{
          height: 60,
          width: 60,
          left: -30,
          position: 'absolute',
          top: height * 0.05,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View
        pointerEvents="none"
        sx={{
          height: 50,
          width: 100,
          right: -25,
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/cloud.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          right: -15,
          position: 'absolute',
          bottom: height * 0.03,
          zIndex: 0,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          right: -10,
          position: 'absolute',
          bottom: height * 0.48,
          zIndex: 0,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 75,
          right: -25,
          position: 'absolute',
          bottom: height * 0.44,
          zIndex: 0,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/flower.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>

      <View
        pointerEvents="none"
        sx={{
          height: 75,
          width: 115,
          right: -30,
          position: 'absolute',
          top: 0 + top,
        }}
      >
        <Image
          source={require('../../../assets/images/events/cny/home-deco/cloud-gold.png')}
          sx={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
    </>
  )
}

export default CnyAuthDeco
