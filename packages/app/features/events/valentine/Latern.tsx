import Image, { MotifiedImage } from 'app/components/common/Image'
import useOrientation from 'app/hooks/useOrientation'
import { View } from 'dripsy'
import React, { memo, useMemo } from 'react'

const Lantern = () => {
  const { isLandscape } = useOrientation()
  const FROM_ROTATE = '-45deg'
  const TO_ROTATE = '45deg'
  const ROTATE_DURATION = 2000

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
      <MotifiedImage
        source={require('app/assets/images/events/valentine/lovelantern-left.png')}
        sx={{
          width: 60,
          aspectRatio: 133 / 311,
        }}
        resizeMode="contain"
        from={{
          rotateY: FROM_ROTATE,
        }}
        animate={{
          rotateY: TO_ROTATE,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 4000,
          delay: 100,
        }}
      />
      <MotifiedImage
        source={require('app/assets/images/events/valentine/lovelantern-middle.png')}
        sx={{
          width: 40,
          aspectRatio: 89 / 172,
        }}
        resizeMode="contain"
        from={{
          rotateY: FROM_ROTATE,
        }}
        animate={{
          rotateY: TO_ROTATE,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 2000,
          delay: 300,
        }}
      />
      <MotifiedImage
        source={require('app/assets/images/events/valentine/lovelantern-right.png')}
        sx={{
          width: 50,
          aspectRatio: 99 / 252,
        }}
        resizeMode="contain"
        from={{
          rotateY: FROM_ROTATE,
        }}
        animate={{
          rotateY: TO_ROTATE,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 3000,
          delay: 200,
        }}
      />
      <MotifiedImage
        source={require('app/assets/images/events/valentine/cupid.png')}
        sx={{
          width: 250,
          aspectRatio: 497 / 327,
          position: 'absolute',
          top: '10%',
          right: isLandscape ? 0 : '-10%',
        }}
        resizeMode="contain"
        from={{
          rotate: '0deg',
        }}
        animate={{
          rotate: '5deg',
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 3000,
        }}
      />
    </View>
  )
}

export default memo(Lantern)
