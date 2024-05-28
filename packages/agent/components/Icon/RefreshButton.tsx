import { SxProp, styled } from 'dripsy'
import { MotiView } from 'moti'
import React, { useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'

import { IconButtonProps } from 'app/components/IconButton'
import IconButton from 'app/components/IconButton'

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
  const AnimatedRefresh = useMemo(
    () => (
      <StyledMotiView
        key={(!!loading).toString()}
        from={{ rotateZ: `0deg` }}
        animate={{ rotateZ: `${ROTATION_DEG}deg` }}
        transition={{
          loop: loading,
          repeatReverse: false,
          type: 'timing',
          duration: 1000,
        }}
        sx={sx}
      >
        <IconButton name="refresh" size={size} onPress={onPress} />
      </StyledMotiView>
    ),
    [loading]
  )
  return <>{AnimatedRefresh}</>
}

const StyledMotiView = styled(MotiView)()

export default RefreshButton
