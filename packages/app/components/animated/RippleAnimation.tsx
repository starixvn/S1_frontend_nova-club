import { View } from 'dripsy'
import { MotiView } from 'moti'
import React from 'react'

const RippleAnimation = ({ scale, delay }) => {
  return (
    <MotiView
      from={{
        opacity: 1,
        scale: 1,
      }}
      animate={{ opacity: 0, scale }}
      transition={{
        loop: true,
        repeatReverse: false,
        type: 'timing',
        duration: 2000,
        delay,
      }}
      style={{
        position: 'absolute',
        paddingVertical: 12,
        paddingLeft: 16,
        paddingRight: 20,
        backgroundColor: 'orange',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
      }}
    >
      <View
        sx={{
          height: 25,
          width: 25,
        }}
      ></View>
    </MotiView>
  )
}

export default RippleAnimation
