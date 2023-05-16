import IconButton, { IIconButtonProps } from 'agent/components/Icon/IconButton'
import { SxProp, View } from 'dripsy'
import { MotiView } from 'moti'
import { useEffect, useState } from 'react'
import { GestureResponderEvent, Omit } from 'react-native'
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

type RefreshButtonProps = {
  onPress?: (event: GestureResponderEvent) => void
  loading?: boolean
  containerStyle?: SxProp
} & Omit<IIconButtonProps, 'name'>

const ROTATION_DEG = 360
const ANIMATION_DURATION = 500

const RefreshButton = ({
  loading,
  onPress,
  containerStyle,
  ...rest
}: RefreshButtonProps) => {
  const [isRefresh, setIsRefresh] = useState(false)

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
    setIsRefresh(status)
  }

  useEffect(() => {
    if (loading) {
      setIsRefresh(true)

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
    }
    if (isRefresh && !loading) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <View sx={containerStyle}>
      <MotiView style={animationStyle}>
        <IconButton
          onPress={onPressHandler}
          name="refresh"
          size={15}
          {...rest}
        />
      </MotiView>
    </View>
  )
}

export default RefreshButton
