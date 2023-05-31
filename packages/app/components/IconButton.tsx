import { Pressable, SxProp } from 'dripsy'
import React from 'react'
import Icon, { IconProps } from './Icon'
export interface IconButtonProps extends IconProps {
  onPress?: () => void
  disabled?: boolean
  iconSx?: SxProp
}

const IconButton = ({
  sx,
  onPress,
  iconSx,
  disabled,
  ...rest
}: IconButtonProps) => {
  return (
    <Pressable
      sx={{ p: 4, opacity: disabled ? 0.3 : 1, ...sx }}
      onPress={onPress}
    >
      <Icon sx={iconSx} {...rest} />
    </Pressable>
  )
}

export default IconButton
