import { View as MotiView, TransitionConfig, useDynamicAnimation } from 'moti'
import React from 'react'
import { StyleSheet, Platform, Dimensions } from 'react-native'
import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated'

const windowHeight = Dimensions.get('window').height

type Props = {
  children?: React.ReactNode
  /**
   * Custom transition for the outer `moti` View, which animates the `height`.
   *
   * See the [moti docs](https://moti.fyi/animations#customize-your-animation) for more info.
   *
   * Defaults to a `type: 'timing'` animation with a `delay` of 200. You can use this to customize that.
   */
  containerTransition?: TransitionConfig
  /**
   * If `true`, the height will automatically animate to 0. Default: `false`.
   */
  hide?: boolean
  initialHeight?: number
  onHeightDidAnimate?: (height: number) => void
} & React.ComponentProps<typeof MotiView>

const styles = StyleSheet.create({
  autoBottom: {
    bottom: 'auto',
  },
  hidden: {
    overflow: 'hidden',
  },
})

const DELAY = Platform.select({ web: 250, default: 0 })
const defaultTransition: TransitionConfig = {
  type: 'timing',
  delay: DELAY,
}

const AnimateHeight: React.FC<Props> = ({
  animate = {},
  children,
  containerTransition = defaultTransition,
  hide = false,
  initialHeight = 0,
  onHeightDidAnimate,
  style,
  transition = defaultTransition,
  ...motiViewProps
}) => {
  const measuredHeight = useSharedValue(initialHeight)
  const animation = useDynamicAnimation(() => ({
    height: hide ? 0 : measuredHeight.value,
  }))
  const height = hide ? 0 : measuredHeight.value
  const isVisible = height || !hide

  useAnimatedReaction(
    () => (hide ? 0 : measuredHeight.value),
    (result) => {
      if (result > windowHeight) {
        animation.animateTo({
          height: windowHeight,
        })
      }

      animation.animateTo({
        height: result,
      })
    },
    [animation, height, hide]
  )

  return (
    <MotiView
      onDidAnimate={
        onHeightDidAnimate &&
        ((key) => key === 'height' && onHeightDidAnimate(height))
      }
      state={animation}
      style={[style, styles.hidden]}
      transition={containerTransition}
    >
      <MotiView
        {...motiViewProps}
        style={[StyleSheet.absoluteFillObject, styles.autoBottom]}
        animate={{ ...animate, opacity: isVisible ? 1 : 0 }}
        transition={transition}
        onLayout={(next) => {
          measuredHeight.value = next.nativeEvent.layout.height
        }}
      >
        {children}
      </MotiView>
    </MotiView>
  )
}

export default AnimateHeight
