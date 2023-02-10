import Image from 'app/components/common/Image'
import useOrientation from 'app/hooks/useOrientation'
import { View } from 'dripsy'
import React from 'react'
import { isLandscape } from 'react-native-device-info'

export const LoveLeft = () => {
  const { isLandscape } = useOrientation()
  return (
    <View
      sx={{
        position: 'absolute',
        left: 0,
        bottom: isLandscape ? '0%' : '35%',
        alignItems: 'flex-start',
      }}
    >
      <Image
        source={require('app/assets/images/events/valentine/love-left-01.png')}
        sx={{
          width: 80,
          height: undefined,
          aspectRatio: 1 / 1,
          mb: 12,
          ml: '-30%',
        }}
        resizeMode="contain"
      />
      <Image
        source={require('app/assets/images/events/valentine/love-left-02.png')}
        sx={{
          width: 120,
          height: undefined,
          aspectRatio: 1 / 1,
          my: 24,
          ml: '-25%',
        }}
        resizeMode="contain"
      />
      <Image
        source={require('app/assets/images/events/valentine/love-left-03.png')}
        sx={{
          width: 60,
          height: undefined,
          aspectRatio: 1 / 1,
          my: 12,
          ml: '-20%',
        }}
        resizeMode="contain"
      />
    </View>
  )
}

export const LoveRight = () => {
  const { isLandscape } = useOrientation()
  return (
    <View
      sx={{
        position: 'absolute',
        right: isLandscape ? 15 : 0,
        bottom: '10%',
        alignItems: 'flex-end',
      }}
    >
      <Image
        source={require('app/assets/images/events/valentine/love-right-01.png')}
        sx={{
          width: 100,
          height: undefined,
          aspectRatio: 1 / 1,
          mb: 48,
          mr: '-30%',
        }}
        resizeMode="contain"
      />
      <Image
        source={require('app/assets/images/events/valentine/love-right-02.png')}
        sx={{
          width: 150,
          height: undefined,
          aspectRatio: 1 / 1,
          my: 24,
          mr: '-30%',
        }}
        resizeMode="contain"
      />
      <Image
        source={require('app/assets/images/events/valentine/love-right-03.png')}
        sx={{
          width: 60,
          height: undefined,
          aspectRatio: 1 / 1,
          my: 12,
          mr: 12,
        }}
        resizeMode="contain"
      />
      <Image
        source={require('app/assets/images/events/valentine/love-right-04.png')}
        sx={{
          width: 100,
          height: undefined,
          aspectRatio: 1 / 1,
          mr: 24,
        }}
        resizeMode="contain"
      />
    </View>
  )
}
