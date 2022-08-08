import { toThousandSeparator } from 'app/utils'
import { Sx, Text, View } from 'dripsy'
import React, { ComponentProps, useEffect, useState } from 'react'
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const DEFAULT_ANIMATION_DURATION = 3000

type ViewProps = ComponentProps<typeof View>

type AnimatedNumberProps = {
  animateToNumber: number
  fontStyle?: Sx
  animationDuration?: number
  isCommandSeparated?: boolean
} & ViewProps

const NumberAnimator = ({
  animateToNumber,
  fontStyle,
  animationDuration,
  isCommandSeparated = true,
  ...props
}: AnimatedNumberProps) => {
  const [counter, setCounter] = useState(0)

  const translateY = useSharedValue(0)

  useDerivedValue(() => {
    runOnJS(setCounter)(Math.floor(translateY.value))
  })

  useEffect(() => {
    translateY.value = withTiming(animateToNumber, {
      duration: animationDuration || DEFAULT_ANIMATION_DURATION,
      easing: Easing.bezier(0, 0, 0.58, 1),
    })
  }, [animateToNumber, animationDuration, translateY])

  return (
    <View {...props}>
      <Text sx={{ ...fontStyle }}>
        {isCommandSeparated ? toThousandSeparator(String(counter)) : counter}
      </Text>
    </View>
  )
}

export default NumberAnimator
