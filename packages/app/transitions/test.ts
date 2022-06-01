import {
  StackCardInterpolationProps,
  StackCardInterpolatedStyle,
} from '@react-navigation/stack'
import { Animated, Platform } from 'react-native'

/**
 * Simple fade animation for dialogs
 */
export function forFadeFromCenter({
  current: { progress },
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  return {
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }
}

export function fadeScaleIn({
  index,
  insets,
  current,
  next,
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  const scale = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1, 1.5],
  })

  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  })

  return {
    cardStyle: {
      opacity,
      transform: [{ scale }],
    },
  }
}
