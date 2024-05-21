import React, { useEffect, useRef, useState } from 'react'
import { Animated, PanResponder } from 'react-native'

const Draggable = ({ children }) => {
  const pan = useRef(new Animated.ValueXY()).current

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: true,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset()
      },
    })
  ).current
  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  )
}

export default Draggable
