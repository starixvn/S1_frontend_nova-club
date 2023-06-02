import { View } from 'dripsy'
import React, { FC, useEffect, useState } from 'react'
import { GestureResponderEvent } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import Icon, { IconProps } from './Icon'
import BouncePressable from './pressable/BouncePressable'
// import Icon from 'src/components/form/Icon'

interface RefreshButtonProps {
  onPress?: (event: GestureResponderEvent) => void
  _icon?: Partial<IconProps>
  loading?: boolean
}

const ROTATION_DEG = 360
const ANIMATION_DURATION = 500

const RefreshButton: FC<RefreshButtonProps> = (props) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const { onPress, _icon, loading = false, ...restProps } = props

  const animation = useSharedValue(0)
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: animation.value + 'deg',
        },
      ],
    }
  })

  const onPressHandler = async (event: GestureResponderEvent) => {
    onPress && (await onPress(event))
  }

  const setIsAnimatingStatus = (status = false) => {
    setIsAnimating(status)
  }

  useEffect(() => {
    if (loading) {
      setIsAnimating(true)

      animation.value = withRepeat(
        withTiming(ROTATION_DEG, {
          duration: ANIMATION_DURATION,
          easing: Easing.linear,
        }),
        -1,
        false,
        () => {
          if (animation.value === ROTATION_DEG) {
            runOnJS(setIsAnimatingStatus)()
            animation.value = 0
          }
        }
      )
    } else {
      if (animation.value !== 0) {
        animation.value = withTiming(
          ROTATION_DEG,
          {
            duration:
              ANIMATION_DURATION -
              (animation.value / ROTATION_DEG) * ANIMATION_DURATION,
            easing: Easing.linear,
          },
          () => {
            runOnJS(setIsAnimatingStatus)()
            animation.value = 0
          }
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <BouncePressable {...restProps} onPress={onPressHandler}>
      <Animated.View style={[animationStyle]}>
        <Icon name="refresh" {..._icon} />
      </Animated.View>
    </BouncePressable>
  )
}

export default RefreshButton
