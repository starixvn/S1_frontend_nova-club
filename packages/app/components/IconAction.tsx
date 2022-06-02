import { Gradient } from '@dripsy/gradient'
import { Pressable, styled, Text, View } from 'dripsy'
import React from 'react'
import { DripsyGradient } from './Gradient'
import Icon from './Icon'

const IconAction = ({ gradient, icon, title, ...rest }) => {
  return (
    <StyledPressable
      android_ripple={{ color: 'black', borderless: false }}
      {...rest}
    >
      <StyledGradient
        gradient={gradient}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={42} />
      </StyledGradient>
      <Text
        sx={{
          my: '$2',
          fontSize: 13,
          fontWeight: 'bold',
          flexWrap: 'nowrap',
        }}
      >
        {title}
      </Text>
    </StyledPressable>
  )
}

const StyledPressable = styled(Pressable)(({ onPressIn }) => ({
  alignItems: 'center',
}))

const StyledGradient = styled(Gradient)(() => ({
  aspectRatio: 1,
  height: 72,
  borderWidth: 2,
  borderColor: '$PaleBlue',
  borderRadius: 18,
}))

export default IconAction
