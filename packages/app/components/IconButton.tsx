import { Pressable, SxProp } from 'dripsy'
import React from 'react'
import Icon, { IconProps } from './icon'
export interface IconButtonProps extends IconProps {
  onPress?: () => void
  disabled?: boolean
  iconSx?: SxProp
}

const IconButton = ({ sx, onPress, iconSx, ...rest }: IconButtonProps) => {
  return (
    <Pressable sx={{ p: '$1', ...sx }} onPress={onPress}>
      <Icon sx={iconSx} {...rest} />
    </Pressable>
  )
}

export default IconButton
