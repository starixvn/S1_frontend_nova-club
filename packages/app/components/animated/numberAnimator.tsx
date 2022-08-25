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
const DEFAULT_TIMER_INTERVAL = 1000

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
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | undefined>()
  const timerValueRef = useRef(animateToNumber)
  const isFocus = useIsFocused()

  const timerSharedValue = useSharedValue(0)

  useDerivedValue(() => {
    runOnJS(setCounter)(Math.floor(timerSharedValue.value))
  })

  const startTimer = useCallback(() => {
    if (timerIncrementValue) {
      timeoutIdRef.current = setTimeout(() => {
        timerValueRef.current +=
          typeof timerIncrementValue === 'number'
            ? timerIncrementValue
            : timerIncrementValue?.()

        animateNumber(timerValueRef.current)
      }, timerInterval)
    }
  }, [animateNumber, timerIncrementValue, timerInterval])

  const animateNumber = useCallback(
    (timerVal: number) => {
      timerSharedValue.value = withTiming(
        timerVal,
        {
          duration: animationDuration || DEFAULT_ANIMATION_DURATION,
          easing: Easing.bezier(0.04, 0.87, 0.61, 0.97),
        },
        (finished) => {
          if (finished) {
            runOnJS(startTimer)()
          }
        }
      )
    },
    [animationDuration, startTimer, timerSharedValue]
  )

  const resetTimer = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timerSharedValue.value = 0
    timerValueRef.current = animateToNumber
  }, [animateToNumber, timerSharedValue])

  useEffect(() => {
    if (!isFocus) {
      resetTimer()
      return
    }

    return () => {
      resetTimer()
    }
  }, [isFocus, resetTimer])

  useEffect(() => {
    if (animateToNumber <= 0) return

    if (isFocus) {
      timerValueRef.current = animateToNumber
      animateNumber(timerValueRef.current)
    }
  }, [animateNumber, animateToNumber, isFocus])

  return (
    <View
      {...props}
      sx={{
        ...{ maxWidth: '100%', textAlign: 'center', px: '$3' },
        ...props.sx,
      }}
    >
      <Text numberOfLines={2} sx={{ ...fontStyle }}>
        {isCommandSeparated ? toThousandSeparator(String(counter)) : counter}
      </Text>
    </View>
  )
}

export default NumberAnimator
