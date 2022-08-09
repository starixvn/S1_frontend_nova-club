import { useIsFocused } from 'app/hooks/isFocus/useIsFocused'
import { toThousandSeparator } from 'app/utils'
import { Sx, Text, View } from 'dripsy'
import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const DEFAULT_ANIMATION_DURATION = 3000
// `DEFAULT_ANIMATION_DURATION` is added here to wait for previous
// animation to finish
const DEFAULT_TIMER_INTERVAL = DEFAULT_ANIMATION_DURATION + 2000

type ViewProps = ComponentProps<typeof View>

type AnimatedNumberProps = {
  animateToNumber: number
  fontStyle?: Sx
  animationDuration?: number
  isCommandSeparated?: boolean
  timerIncrementValue?: number | (() => number)
  timerInterval?: number
} & ViewProps

const NumberAnimator = ({
  animateToNumber,
  fontStyle,
  animationDuration,
  isCommandSeparated = true,
  timerIncrementValue,
  timerInterval = DEFAULT_TIMER_INTERVAL,
  ...props
}: AnimatedNumberProps) => {
  const [counter, setCounter] = useState(0)
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | undefined>()
  const timerValueRef = useRef(animateToNumber)
  const isFocus = useIsFocused()

  const timerSharedValue = useSharedValue(0)

  useDerivedValue(() => {
    runOnJS(setCounter)(Math.floor(timerSharedValue.value))
  })

  const animateNumber = useCallback(
    (timerVal: number) => {
      timerSharedValue.value = withTiming(timerVal, {
        duration: animationDuration || DEFAULT_ANIMATION_DURATION,
        easing: Easing.bezier(0.04, 0.87, 0.61, 0.97),
      })
    },
    [animationDuration, timerSharedValue]
  )

  const resetTimer = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
    }

    timerSharedValue.value = 0
    timerValueRef.current = animateToNumber
  }, [animateToNumber, timerSharedValue])

  useEffect(() => {
    if (!isFocus) {
      resetTimer()
      return
    }

    animateNumber(timerValueRef.current)

    if (timerIncrementValue) {
      intervalIdRef.current = setInterval(() => {
        timerValueRef.current =
          timerValueRef.current +
          (typeof timerIncrementValue === 'number'
            ? timerIncrementValue
            : timerIncrementValue?.())

        animateNumber(timerValueRef.current)
      }, timerInterval)
    }

    return () => {
      resetTimer()
    }
  }, [animateNumber, isFocus, resetTimer, timerIncrementValue, timerInterval])

  return (
    <View {...props}>
      <Text sx={{ ...fontStyle }}>
        {isCommandSeparated ? toThousandSeparator(String(counter)) : counter}
      </Text>
    </View>
  )
}

export default NumberAnimator
