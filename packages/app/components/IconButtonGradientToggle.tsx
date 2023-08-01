import { SxProp, View } from 'dripsy'
import { MotiView, useAnimationState } from 'moti'
import React, { useEffect } from 'react'
import { TextProps } from 'react-native/Libraries/Text/Text'
import IconButtonGradient, {
  IconButtonGradientProps,
} from './IconButtonGradient'
import useLocalization from 'app/provider/localization'

interface IconButtonGradientToggleProps extends IconButtonGradientProps {
  label?: string
  labelProps?: SxProp & TextProps
  active?: boolean
}

export default function IconButtonGradientToggle({
  size,
  active,
  label,
  labelProps,
  sx,
  iconProps,
  ...rest
}: IconButtonGradientToggleProps) {
  const { t } = useLocalization()
  const animState = useAnimationState({
    inactive: {
      scale: 0.8,
    },
    active: {
      scale: 1,
    },
  })

  useEffect(() => {
    animState.transitionTo(active ? 'active' : 'inactive')
  }, [active, animState])

  const _iconProps = Object.assign({}, iconProps, {
    color: !active ? '$primary.500' : 'white',
  })

  return (
    <View sx={{ alignItems: 'center', ...sx }}>
      <MotiView state={animState} transition={{ type: 'timing' }}>
        <IconButtonGradient size={size} iconProps={_iconProps} {...rest} />
      </MotiView>
      {label && (
        <IconButtonGradient.Label
          sx={{ fontWeight: active ? '900' : 'normal' }}
          {...labelProps}
        >
          {t(label)}
        </IconButtonGradient.Label>
      )}
    </View>
  )
}
