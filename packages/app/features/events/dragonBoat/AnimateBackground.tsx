import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, View } from 'dripsy'
import { useWindowDimensions } from 'react-native'
import { View as MotiView, useAnimationState } from 'moti'
import { useEffect } from 'react'

const AnimateBackground = () => {
  const { top } = useSafeArea()
  const { height, width } = useWindowDimensions()
  const wave2 = useAnimationState({
    from: { translateX: 0 },
    to: { translateX: 45 },
  })
  const wave3 = useAnimationState({
    from: { translateX: 0 },
    to: { translateX: -45 },
  })
  const boat = useAnimationState({
    from: { translateX: 0 },
    to: { translateX: 25 },
  })

  return (
    <View
      sx={{
        position: 'absolute',
        width,
        bottom: 0,
      }}
    >
      <MotiView
        state={wave3}
        transition={{
          loop: true,
          delay: 500,
          damping: 30,
          mass: 20,
          duration: 3000,
        }}
        style={{
          position: 'absolute',
          right: 0,
          bottom: -70,
          width: '140%',
        }}
      >
        <Image
          sx={{
            height: 200,
          }}
          resizeMode="contain"
          source={require('../../../assets/images/events/dragonBoat/wave3.png')}
        />
      </MotiView>
      <MotiView
        state={wave2}
        transition={{
          loop: true,
          delay: 300,
          damping: 30,
          mass: 30,
          duration: 3000,
        }}
        style={{
          position: 'absolute',
          right: 0,
          bottom: -85,
          width: '140%',
        }}
      >
        <Image
          sx={{
            height: 200,
          }}
          resizeMode="contain"
          source={require('../../../assets/images/events/dragonBoat/wave2.png')}
        />
      </MotiView>

      <MotiView
        nativeID="dragon_boat"
        state={boat}
        transition={{
          loop: true,
          damping: 30,
          mass: 10,
        }}
        style={{
          position: 'absolute',
          left: '5%',
          bottom: -25,
          width: '100%',
          transform: [{ rotate: '100deg' }],
        }}
      >
        <Image
          sx={{
            height: 250,
            width: 350,
          }}
          resizeMode="contain"
          source={require('../../../assets/images/events/dragonBoat/dragon-boat.png')}
        />
      </MotiView>

      <View
        style={{
          position: 'absolute',
          right: -20,
          bottom: -105,
          width: '140%',
        }}
      >
        <Image
          sx={{
            height: 200,
          }}
          resizeMode="contain"
          source={require('../../../assets/images/events/dragonBoat/wave1.png')}
        />
      </View>
    </View>
  )
}

export default AnimateBackground
