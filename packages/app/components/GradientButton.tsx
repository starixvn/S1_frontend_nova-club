import { Pressable, SxProp, Text, View, styled } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import { MotiView } from 'moti/build'
import React from 'react'
import { TextProps, TouchableOpacityProps } from 'react-native'
import Icon, { IconProps } from './Icon'
const ICON_SIZE = 60
const ICON_ACTIVE_SIZE_SCALE = 1.25

interface GradientButtonProps extends TouchableOpacityProps {
  size?: number
  iconProps: IconProps
  label?: string
  labelProps?: IconLabelProps
  active?: boolean
  toggle?: boolean
}

interface IconLabelProps extends TextProps {
  active?: boolean
  sx?: SxProp
}

const GradientButton = ({
  iconProps,
  label,
  size = ICON_SIZE,
  labelProps,
  onPress,
  active = false,
  toggle = false,
  ...rest
}: GradientButtonProps) => {
  const scaledSize = active ? size * ICON_ACTIVE_SIZE_SCALE : size
  const translateYValue = active ? -size * 0.75 : toggle ? -size * 0.5 : 0
  return (
    <Pressable onPress={onPress} {...rest}>
      <MotiView
        from={{
          height: size,
          width: size,
          transform: [{ translateY: 0 }],
        }}
        animate={{
          height: scaledSize,
          width: scaledSize,
          transform: [{ translateY: translateYValue }],
        }}
        transition={{ type: 'timing' }}
      >
        <Gradient
          gradient={'button'}
          sx={{
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconBorderView>
            <Icon color={active ? 'white' : '#0D2035'} {...iconProps} />
          </IconBorderView>
        </Gradient>

        <IconLabel active {...labelProps}>
          {label}
        </IconLabel>
      </MotiView>
    </Pressable>
  )
}

const IconBorderView = styled(View)({
  borderRadius: 100,
  borderColor: '#32325A',
  borderWidth: 3.5,
  width: '95%',
  height: '95%',
  alignItems: 'center',
  justifyContent: 'center',
})

const IconLabel = styled(Text)(({ active }: IconLabelProps) => ({
  textAlign: 'center',
  fontWeight: active ? 'bold' : '100',
  paddingTop: 5,
}))

export default GradientButton
