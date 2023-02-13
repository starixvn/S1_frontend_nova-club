import { MotifiedImage } from 'app/components/common/Image'
import useOrientation from 'app/hooks/useOrientation'
import { View } from 'dripsy'
import React, { memo, useMemo } from 'react'

const CLOUD_DURATION_01 = 5000
const CLOUD_DURATION_02 = 5000
const CLOUD_DURATION_03 = 4750
const CLOUD_DURATION_04 = 10000
const BOTTOM_CLOUD = -20

const Cloud = () => {
  const { isLandscape } = useOrientation()
  const CLOUD_MOVE_WITDH = 30
  const SWING_WIDTH = isLandscape ? 5 : 2
  const ROTATE_WIDTH = isLandscape ? SWING_WIDTH * 1.25 : SWING_WIDTH * 0.5

  const MemoGrass1 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/grass-right.png')}
        resizeMode="contain"
        style={{
          position: 'absolute',
          height: undefined,
          width: '50%',
          right: 0,
          bottom: 30,
          aspectRatio: 280 / 184,
        }}
        from={{
          translateX: -SWING_WIDTH,
          rotate: `-${ROTATE_WIDTH}deg`,
        }}
        animate={{
          rotate: `${ROTATE_WIDTH}deg`,
          translateX: SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 2000,
          delay: 25,
        }}
      />
    ),
    []
  )
  const MemoGrass2 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/grass-left.png')}
        resizeMode="contain"
        sx={{
          position: 'absolute',
          height: undefined,
          width: isLandscape ? 250 : [150, 250],
          bottom: isLandscape ? 80 : 30,
          aspectRatio: 281 / 157,
        }}
        from={{
          translateX: SWING_WIDTH,
          rotate: `${ROTATE_WIDTH}deg`,
        }}
        animate={{
          rotate: `-${ROTATE_WIDTH}deg`,
          translateX: -SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
          delay: 25,
        }}
      />
    ),
    []
  )

  const MemoFlower1 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/flower-left.png')}
        resizeMode="contain"
        sx={{
          position: 'absolute',
          left: '35%',
          height: undefined,
          width: [30, 40],
          bottom: isLandscape ? 150 : 90,
          aspectRatio: 53 / 131,
        }}
        from={{
          translateX: -SWING_WIDTH,
          rotate: `-${ROTATE_WIDTH}deg`,
        }}
        animate={{
          rotate: `${ROTATE_WIDTH}deg`,
          translateX: SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
          delay: 100,
        }}
      />
    ),
    [isLandscape]
  )
  const MemoFlower2 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/flower-right.png')}
        resizeMode="contain"
        sx={{
          position: 'absolute',
          right: '30%',
          height: undefined,
          width: 45,
          bottom: isLandscape ? 150 : [40, 80],
          aspectRatio: 82 / 225,
        }}
        from={{
          translateX: SWING_WIDTH,
          rotate: `${ROTATE_WIDTH}deg`,
        }}
        animate={{
          rotate: `-${ROTATE_WIDTH}deg`,
          translateX: -SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
          delay: 25,
        }}
      />
    ),
    [isLandscape]
  )

  const Bear = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/bear.png')}
        resizeMode="contain"
        sx={{
          position: 'absolute',
          left: isLandscape ? '12%' : [15, 50],
          bottom: isLandscape ? 50 : 0,
          height: undefined,
          width: 110,
          aspectRatio: 208 / 448,
        }}
        from={{
          translateX: SWING_WIDTH,
          rotate: `${ROTATE_WIDTH}deg`,
        }}
        animate={{
          rotate: `-${ROTATE_WIDTH}deg`,
          translateX: -SWING_WIDTH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
          delay: 25,
        }}
      />
    ),
    [isLandscape]
  )

  const Cloud1 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/cloud-back.png')}
        resizeMode="contain"
        sx={{
          position: 'absolute',
          bottom: isLandscape ? BOTTOM_CLOUD : [BOTTOM_CLOUD, -80],
          height: undefined,
          width: '200%',
          aspectRatio: 1123 / 350,
        }}
        from={{
          translateX: -CLOUD_MOVE_WITDH,
        }}
        animate={{
          translateX: CLOUD_MOVE_WITDH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: CLOUD_DURATION_03,
        }}
      />
    ),
    [isLandscape]
  )
  const Cloud2 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/cloud.png')}
        resizeMode="contain"
        sx={{
          position: 'absolute',
          left: '-50%',
          bottom: isLandscape ? BOTTOM_CLOUD : [BOTTOM_CLOUD, -50],
          height: undefined,
          width: '100%',
          aspectRatio: 687 / 236,
        }}
        from={{
          translateX: CLOUD_MOVE_WITDH,
        }}
        animate={{
          translateX: -CLOUD_MOVE_WITDH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: CLOUD_DURATION_01,
        }}
      />
    ),
    [isLandscape]
  )
  const Cloud3 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/cloud.png')}
        resizeMode="contain"
        sx={{
          position: 'absolute',
          right: '-50%',
          bottom: isLandscape ? BOTTOM_CLOUD : [BOTTOM_CLOUD, -50],
          height: undefined,
          width: '100%',
          aspectRatio: 687 / 236,
        }}
        from={{
          translateX: CLOUD_MOVE_WITDH,
        }}
        animate={{
          translateX: -CLOUD_MOVE_WITDH,
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: CLOUD_DURATION_01,
        }}
      />
    ),
    [isLandscape]
  )
  return (
    <View
      pointerEvents="none"
      sx={{
        position: 'absolute',
        bottom: isLandscape ? '-15%' : 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '20%',
      }}
    >
      {MemoGrass1}
      {MemoFlower1}
      {MemoGrass2}
      {MemoFlower2}
      {Cloud1}
      {Bear}
      {Cloud2}
      {Cloud3}
    </View>
  )
}

export default memo(Cloud)
