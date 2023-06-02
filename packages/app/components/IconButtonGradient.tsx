import { Pressable, SxProp, Text, View, styled } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React from 'react'
import { PressableProps, TextProps } from 'react-native'
import Icon, { IconProps } from './Icon'
const ICON_SIZE = 40

export interface IconButtonGradientProps extends PressableProps {
  size?: number
  icon?: string
  iconProps?: IconProps
  sx?: SxProp
}

const IconButtonGradient = ({
  icon,
  iconProps,
  size = ICON_SIZE,
  ...rest
}: IconButtonGradientProps) => {
  const iconName = iconProps?.name ?? icon

  return (
    <Root size={size} {...rest}>
      <IconBorderView pointerEvents="none">
        <Gradient
          gradient={'button'}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          {iconName != null && (
            <Icon
              color={'white'}
              size={size * 0.4}
              {...iconProps}
              name={iconName}
            />
          )}
        </Gradient>
      </IconBorderView>
    </Root>
  )
}

const Root = styled(Pressable)(({ size }: { size: number }) => ({
  backgroundColor: '$primary.500',
  borderRadius: size * 0.7,
  justifyContent: 'center',
  alignItems: 'center',
  height: size,
  width: size,
  overflow: 'hidden',
  borderWidth: size * 0.04,
  borderColor: '$primary.200',
}))

const IconBorderView = styled(View)({
  pointerEvents: 'none',
  bg: '$primary.500',
  height: '85%',
  width: '85%',
  borderRadius: 100,
  overflow: 'hidden',
})

const IconLabel = styled(Text)(() => ({
  textAlign: 'center',
  fontSize: 13,
  mt: 6,
}))

IconButtonGradient.Label = IconLabel

export default IconButtonGradient
