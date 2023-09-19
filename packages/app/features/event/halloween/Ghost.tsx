import { MotifiedImage } from 'app/components/common/Image'
import { View } from 'dripsy'
import React from 'react'

type Props = {}

export default function Ghost({}: Props) {
  return (
    <View
      pointerEvents="none"
      sx={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 2,
        elevation: 2,
      }}
    >
      <MotifiedImage
        source={require('app/assets/images/events/halloween/ghost.png')}
        resizeMode="contain"
        style={{
          width: 60,
          aspectRatio: 136 / 132,
          transform: [{ scaleX: -1 }],
          opacity: 0,
          left: '3%',
          marginTop: '20%',
          position: 'absolute',
        }}
        animate={{
          opacity: 1,
          scaleX: -1,
          translateY: [0, 10],
        }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 2500,
        }}
      />
      <MotifiedImage
        source={require('app/assets/images/events/halloween/ghost.png')}
        resizeMode="contain"
        style={{
          width: 100,
          aspectRatio: 136 / 132,
          right: '5%',
          marginTop: '10%',
          opacity: 0,
          position: 'absolute',
          transform: [{ translateX: -30 }],
        }}
        animate={{
          opacity: 1,
          translateY: [0, -10],
        }}
        transition={{
          loop: true,
          //   repeat: 10,
          duration: 1000,
          type: 'timing',
        }}
      />
    </View>
  )
}
