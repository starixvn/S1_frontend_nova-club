import React, { useEffect } from 'react'
import IconButtonGradient from './IconButtonGradient'
import { MotiView, useAnimationState } from 'moti'
import { View } from 'dripsy'

export default function IconButtonGradientToggle({
  size,
  active,
  label,
  labelProps,
  withTranslate,
  sx,
  ...rest
}) {
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

  return (
    <View sx={{ alignItems: 'center', ...sx }}>
      <MotiView state={animState} transition={{ type: 'timing' }}>
        <IconButtonGradient
          size={size}
          iconProps={{
            ...rest.iconProps,
            color: active ? 'white' : '$primary.500',
          }}
          {...rest}
        />
      </MotiView>
      <IconButtonGradient.Label
        sx={{ fontWeight: active ? '900' : 'normal' }}
        {...labelProps}
      >
        {label}
      </IconButtonGradient.Label>
    </View>
  )
}
