import { View, Text, Image } from 'dripsy'
import { MotiView } from 'moti'
import React from 'react'

interface PlinkoCloudProps {
  enlargedHeight: number
  enlargedWidth: number
  scale: number
}

const PlinkoCloud = ({
  enlargedHeight,
  enlargedWidth,
  scale,
}: PlinkoCloudProps) => {
  return (
    <MotiView
      transition={{
        type: 'timing',
        loop: true,
        // damping: 10,
        // mass: 5,
        duration: 10000,
        // repeatReverse: false,
      }}
      from={{
        opacity: 1,
        scale: 1,
        // transform: [{ translateX: enlargedWidth }],
      }}
      animate={{
        opacity: 0.8,
        scale: 1.5,
        // transform: [{ translateX: -enlargedWidth / 2 }],
      }}
      exit={{
        opacity: 1,
        scale: 1,
        // (width * 0.05, height * 0.7,
        // transform: [{ translateX: enlargedWidth }],
      }}
      style={{
        position: 'absolute',
        zIndex: 2,
        top: enlargedHeight * 0.3,
        left: enlargedWidth * 0.5,
      }}
    >
      <Image
        source={require('../../../../packages/app/assets/images/events/plinko/cloud1-1.svg')}
        sx={{
          aspectRatio: 2 / 1,
          width: enlargedWidth * 0.4,
          position: 'absolute',
        }}
      />
    </MotiView>
  )
}

export default PlinkoCloud
