import { SxProp, View, styled } from 'dripsy'
import React, { FC, useEffect, useState } from 'react'
import { GestureResponderEvent } from 'react-native'
import Animated, {
  Easing,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import IconButton, { IconButtonProps } from './IconButton'
import { MotiView } from 'moti'
// import Icon from 'src/components/form/Icon'

type RefreshButtonProps = {
  onPress?: (event: GestureResponderEvent) => void
  loading?: boolean
  containerStyle?: SxProp
} & Omit<IconButtonProps, 'name'>

const ROTATION_DEG = 360
const ANIMATION_DURATION = 1000

const RefreshButton = ({
  loading,
  onPress,
  size = 22,
  sx,
}: RefreshButtonProps) => {
  // const animation = useSharedValue(0)
  // const animationStyle = useAnimatedStyle(() => {
  //   'worklet'
  //   return {
  //     transform: [
  //       {
  //         translateY: animation.value,
  //       },
  //     ],
  //   }
  // }, [animation.value])

  // function changeValue(v, loop) {
  //   'worklet'

  //   animation.value = withRepeat(
  //     withTiming(v, {
  //       duration: ANIMATION_DURATION,
  //       easing: Easing.linear,
  //     }),
  //     loop ? -1 : 1,
  //     false,
  //     () => {
  //       if (animation.value === ROTATION_DEG) {
  //         // runOnJS(setIsAnimatingStatus)()
  //         animation.value = 0
  //       }
  //     }
  //   )
  // }

  // useEffect(() => {
  //   runOnUI(changeValue)(loading ? ROTATION_DEG : 0, loading)
  // }, [loading])

  // const onPressHandler = async (event: GestureResponderEvent) => {
  //   onPress && (await onPress(event))
  // }

  return (
    <StyledMotiView
      key={(!!loading).toString()}
      from={{ rotateZ: `0deg` }}
      animate={{ rotateZ: `${ROTATION_DEG}deg` }}
      transition={{
        // repeat: loading ? 0 : 1,
        loop: loading,
        repeatReverse: false,
        type: 'timing',
        duration: 1000,
      }}
      sx={sx}
    >
      <IconButton name="refresh" size={size} onPress={onPress} />
    </StyledMotiView>
  )
}

const StyledMotiView = styled(MotiView)()

export default RefreshButton
