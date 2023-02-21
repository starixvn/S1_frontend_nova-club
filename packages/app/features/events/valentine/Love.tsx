import Image, { MotifiedImage } from 'app/components/common/Image'
import useOrientation from 'app/hooks/useOrientation'
import { scales, View } from 'dripsy'
import { useAnimationState } from 'moti'
import React, { useMemo } from 'react'
import { isLandscape } from 'react-native-device-info'

const SCALE_FROM = 0.8
const SCALE_TO = 1

export const LoveLeft = () => {
  const { isLandscape } = useOrientation()

  const scale = useAnimationState({
    from: {
      scale: SCALE_FROM,
    },
    to: { scale: SCALE_TO },
  })

  const MemoLove1 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/love-left-01.png')}
        sx={{
          width: 80,
          height: undefined,
          aspectRatio: 1 / 1,
          mb: 12,
          ml: '-30%',
        }}
        resizeMode="contain"
        state={scale}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      />
    ),
    [scale]
  )

  const MemoLove2 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/love-left-02.png')}
        sx={{
          width: 120,
          height: undefined,
          aspectRatio: 1 / 1,
          my: 24,
          ml: '-25%',
        }}
        resizeMode="contain"
        state={scale}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      />
    ),
    [scale]
  )
  const MemoLove3 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/love-left-03.png')}
        sx={{
          width: 60,
          height: undefined,
          aspectRatio: 1 / 1,
          my: 12,
          ml: '-20%',
        }}
        resizeMode="contain"
        state={scale}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      />
    ),
    [scale]
  )

  return (
    <View
      sx={{
        position: 'absolute',
        left: 0,
        bottom: isLandscape ? '0%' : '35%',
        alignItems: 'flex-start',
      }}
    >
      {MemoLove1}
      {MemoLove2}
      {MemoLove3}
    </View>
  )
}

export const LoveRight = () => {
  const { isLandscape } = useOrientation()
  const scale = useAnimationState({
    from: {
      scale: SCALE_FROM,
    },
    to: { scale: SCALE_TO },
  })

  const MemoLove1 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/love-right-01.png')}
        sx={{
          width: 100,
          height: undefined,
          aspectRatio: 1 / 1,
          mb: 48,
          mr: '-30%',
        }}
        resizeMode="contain"
        state={scale}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
          delay: 100,
        }}
      />
    ),
    [scale]
  )
  const MemoLove2 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/love-right-02.png')}
        sx={{
          width: 150,
          height: undefined,
          aspectRatio: 1 / 1,
          my: 24,
          mr: '-30%',
        }}
        resizeMode="contain"
        state={scale}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      />
    ),
    [scale]
  )
  const MemoLove3 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/love-right-03.png')}
        sx={{
          width: 60,
          height: undefined,
          aspectRatio: 1 / 1,
          my: 12,
          mr: 12,
        }}
        resizeMode="contain"
        state={scale}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      />
    ),
    [scale]
  )
  const MemoLove4 = useMemo(
    () => (
      <MotifiedImage
        source={require('app/assets/images/events/valentine/love-right-04.png')}
        sx={{
          width: 100,
          height: undefined,
          aspectRatio: 1 / 1,
          mr: 24,
        }}
        resizeMode="contain"
        state={scale}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1000,
        }}
      />
    ),
    [scale]
  )

  return (
    <View
      sx={{
        position: 'absolute',
        right: isLandscape ? 15 : 0,
        bottom: '10%',
        alignItems: 'flex-end',
      }}
    >
      {MemoLove1}
      {MemoLove2}
      {MemoLove3}
      {MemoLove4}
    </View>
  )
}
