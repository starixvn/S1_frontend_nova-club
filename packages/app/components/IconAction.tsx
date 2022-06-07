import { Gradient } from '@dripsy/gradient'
import { Pressable, styled, Text, View } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React, { ComponentProps, useMemo } from 'react'
import { DripsyGradient } from './Gradient'
import Icon from './Icon'

type Props = ComponentProps<typeof StyledMotiPressable> & {
  gradient: string
  icon: string
  title: string
  onPress: () => void
}

const IconAction = ({ gradient, icon, title, onPress, ...rest }) => {
  return (
    <View {...rest}>
      <StyledMotiPressable
        onPress={onPress}
        animate={useMemo(
          () =>
            ({ hovered, pressed }) => {
              'worklet'

              return {
                opacity: hovered || pressed ? 0.5 : 1,
                scale: pressed ? 0.95 : 1,
              }
            },
          []
        )}
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
      </StyledMotiPressable>
      <Text
        sx={{
          my: '$2',
          fontSize: 13,
          fontWeight: 'bold',
          flexWrap: 'nowrap',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </View>
  )
}

const StyledMotiPressable = styled(MotiPressable)(() => ({
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
