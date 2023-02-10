import Image, { MotifiedImage } from 'app/components/common/Image'
import useOrientation from 'app/hooks/useOrientation'
import { View } from 'dripsy'
import React, { memo, useMemo } from 'react'

const Lantern = () => {
  const { isLandscape } = useOrientation()

  const LEFT_PADDING_LANTERN = '10%'
  const RIGHT_PADDING_LANTERN = '5%'
  const LANTERN_WIDTH = isLandscape ? '10%' : '23%'
  const SWING_WIDTH = isLandscape ? 5 : 10
  const ROTATE_WIDTH = isLandscape ? SWING_WIDTH * 1.25 : SWING_WIDTH * 0.5

  const FirstLantern = (
    <MotifiedImage
      source={require('app/assets/images/events/valentine/lovelantern-left.png')}
      resizeMode="contain"
      style={{
        alignSelf: 'flex-start',
        marginLeft: LEFT_PADDING_LANTERN,
        width: LANTERN_WIDTH,
        aspectRatio: 200 / 340,
      }}
      from={{
        translateX: SWING_WIDTH,
        rotate: `-${ROTATE_WIDTH}deg`,
      }}
      animate={{
        rotate: `${ROTATE_WIDTH}deg`,
        translateX: -SWING_WIDTH,
      }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 5000,
        delay: 25,
      }}
    />
  )

  const SecondLantern = (
    <MotifiedImage
      source={require('app/assets/images/events/valentine/lovelantern-middle.png')}
      resizeMode="contain"
      style={{
        marginRight: RIGHT_PADDING_LANTERN,
        width: LANTERN_WIDTH,
        aspectRatio: 200 / 420,
      }}
      from={{
        rotateX: `${ROTATE_WIDTH}deg`,
      }}
      animate={{
        rotateX: `-${ROTATE_WIDTH}deg`,
      }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 5000,
        delay: 25,
      }}
    />
  )

  return (
    <View
      pointerEvents="none"
      sx={{
        position: 'absolute',
        top: -2,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        zIndex: 2,
        elevation: 2,
      }}
    >
      <Image
        source={require('app/assets/images/events/valentine/lovelantern-left.png')}
        sx={{
          width: 60,
          aspectRatio: 133 / 311,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('app/assets/images/events/valentine/lovelantern-middle.png')}
        sx={{
          width: 40,
          aspectRatio: 89 / 172,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('app/assets/images/events/valentine/lovelantern-right.png')}
        sx={{
          width: 50,
          aspectRatio: 99 / 252,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('app/assets/images/events/valentine/cupid.png')}
        sx={{
          width: 250,
          aspectRatio: 497 / 327,
          position: 'absolute',
          top: '10%',
          right: isLandscape ? 0 : '-10%',
        }}
        resizeMode="contain"
      />
    </View>
  )
}

export default memo(Lantern)
