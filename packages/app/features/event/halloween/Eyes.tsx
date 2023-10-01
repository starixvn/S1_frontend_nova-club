import { MotifiedImage } from 'app/components/common/Image'
import { View } from 'dripsy'
import React from 'react'

type Props = {}

export default function Eyes({}: Props) {
  return (
    <View
      pointerEvents="none"
      sx={{
        position: 'absolute',
        display: 'flex',
        width: '100%',
        zIndex: 1,
        elevation: 1,
      }}
    >
      <MotifiedImage
        source={require('app/assets/images/events/halloween/eye.png')}
        resizeMode="contain"
        style={{
          width: 35,
          aspectRatio: 1,
          left: '5%',
          marginTop: '40%',
          position: 'absolute',
        }}
        animate={{
          scale: [1, 1.1],
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 2000,
        }}
      />
      <MotifiedImage
        source={require('app/assets/images/events/halloween/eye.png')}
        resizeMode="contain"
        style={{
          width: 45,
          aspectRatio: 1,
          left: '65%',
          marginTop: '20%',
          position: 'absolute',
        }}
        animate={{
          scale: [1, 1.1],
          opacity: [0.8, 1],
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
