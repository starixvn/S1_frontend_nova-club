import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  snowflake: {
    color: 'pink',
    position: 'absolute',
  },
})

const START_Y_POSITION = -50
const FALL_SPEEDS = ['slow', 'medium', 'fast']
const FALL_DURATIONS = {
  fast: [8000, 15000],
  medium: [15000, 30000],
  slow: [30000, 60000],
}
// const SNOWFLAKE_TYPES = ['🌸','❀','✿']
const SNOWFLAKE_TYPES = ['✿']

export default function SakuraFlake({ scene, fallSpeed }) {
  const [config, setConfig] = useState(() => getConfig({ scene, fallSpeed }))
  const animatedY = useRef(new Animated.Value(START_Y_POSITION)).current
  const animatedRotation = useRef(new Animated.Value(0)).current
  const animatedSideMovement = useRef(new Animated.Value(0)).current
  const animatedOpacity = useRef(new Animated.Value(1)).current

  const runAnimation = useCallback(() => {
    animatedY.setValue(START_Y_POSITION)
    animatedRotation.setValue(0)
    animatedSideMovement.setValue(0)

    Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration: config.rotationDuration,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedSideMovement, {
          toValue: -1,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedSideMovement, {
          toValue: 1,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedSideMovement, {
          toValue: 0,
          duration: config.sideMovementDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start()

    Animated.sequence([
      Animated.delay(config.fallDelay),
      Animated.timing(animatedY, {
        toValue: scene.height,
        duration: config.fallDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setConfig(null)
      })
    })
  }, [fallSpeed, scene])

  useEffect(() => {
    if (config) {
      runAnimation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  if (config === null) return <></>

  const rotate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: config.rotationDirection
      ? ['0deg', '360deg']
      : ['360deg', '0deg'],
    extrapolate: 'clamp',
  })

  const translateX = animatedSideMovement.interpolate({
    inputRange: [-1, 1],
    outputRange: [-config.sideMovementAmplitude, config.sideMovementAmplitude],
  })

  return (
    <Animated.Text
      selectable={false}
      style={[
        styles.snowflake,
        {
          transform: [{ translateY: animatedY }, { rotate }, { translateX }],
        },
        {
          left: config.xPosition,
          fontSize: config.size,
          opacity: animatedOpacity,
        },
      ]}
    >
      {config.type}
    </Animated.Text>
  )
}

function getConfig({ scene, fallSpeed = 'slow' } = {}) {
  const { width } = scene

  const size = randomInt(10, 20)
  const opacity = randomInt(8, 10) / 10
  const type = SNOWFLAKE_TYPES[0]
  const xPosition = randomInt(0, width)

  //fall animation
  const fallDuration = randomInt(...FALL_DURATIONS[fallSpeed])
  const fallDelay = randomInt(500, 30000)
  // rotate animation
  const rotationDuration = randomInt(2000, 10000)
  const rotationDirection = randomInt(0, 1)
  // side shake animation
  const sideMovementDuration = randomInt(3000, 8000)
  const sideMovementAmplitude = randomInt(0, 50)

  return {
    size,
    opacity,
    type,
    xPosition,
    fallDuration,
    fallDelay,
    rotationDuration,
    rotationDirection,
    sideMovementDuration,
    sideMovementAmplitude,
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
