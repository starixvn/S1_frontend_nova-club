import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Image, View, styled } from 'dripsy'
import { View as MotiView, useAnimationState } from 'moti'
import { useWindowDimensions } from 'react-native'

const AnimateBackground = () => {
  const { width } = useWindowDimensions()
  const wave2 = useAnimationState({
    from: { translateX: 10 },
    to: { translateX: 30 },
  })
  const wave3 = useAnimationState({
    from: { translateX: 40 },
    to: { translateX: 80 },
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
      <StyledMotiView
        state={wave3}
        transition={{
          loop: true,
          type: 'timing',
          duration: 2000,
        }}
        sx={{
          position: 'absolute',
          right: 0,
          bottom: -90,
          width: ['140%', '110%'],
        }}
      >
        <Image
          sx={{
            width: '100%',
            height: 250,
          }}
          resizeMode="contain"
          source={require('../../../assets/images/events/dragonBoat/wave3.png')}
        />
      </StyledMotiView>
      <StyledMotiView
        state={wave2}
        transition={{
          loop: true,
          type: 'timing',
          duration: 2000,
        }}
        sx={{
          position: 'absolute',
          right: 0,
          bottom: -100,
          width: ['140%', '110%'],
        }}
      >
        <Image
          sx={{
            height: 250,
            width: '100%',
          }}
          resizeMode="contain"
          source={require('../../../assets/images/events/dragonBoat/wave2.png')}
        />
      </StyledMotiView>

      <StyledMotiView
        nativeID="dragon_boat"
        state={boat}
        transition={{
          loop: true,
          type: 'timing',
          duration: 2000,
        }}
        sx={{
          position: 'absolute',
          left: '5%',
          bottom: [-25, -10, 0, 30],
          width: '100%',
          transform: [{ rotate: '100deg' }],
        }}
      >
        <Image
          sx={{
            height: 250,
            minWidth: 350,
            width: '50%',
          }}
          resizeMode="contain"
          source={require('../../../assets/images/events/dragonBoat/dragon-boat.png')}
        />
      </StyledMotiView>

      <View
        sx={{
          position: 'absolute',
          left: -10,
          bottom: -115,
          width: ['140%', '110%'],
          maxWidth: 1400,
        }}
      >
        <Image
          sx={{
            height: 250,
            width: '100%',
          }}
          resizeMode="contain"
          source={require('../../../assets/images/events/dragonBoat/wave1.png')}
        />
      </View>
    </View>
  )
}

const StyledMotiView = styled(MotiView)({})

export default AnimateBackground
