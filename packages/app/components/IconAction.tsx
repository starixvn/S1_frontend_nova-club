import { Gradient } from '@dripsy/gradient'
import { Pressable, styled, Text, View } from 'dripsy'
import { MotiPressable } from 'moti/interactions'
import React, { ComponentProps, FC, useMemo } from 'react'
import { DripsyGradient } from './Gradient'
import Icon from './Icon'

type Props = ComponentProps<typeof StyledMotiPressable> & {
  gradient: string
  icon: string
  title?: string
  size?: string
  onPress: () => void
}

const IconAction: FC<Props> = ({
  gradient,
  icon,
  title,
  size,
  onPress,
  ...rest
}) => {
  let iconSize = 42
  let shapeRadius = 18
  let shapeSize = 72
  if (size === 'sm') {
    iconSize = 25
    shapeRadius = 15
    shapeSize = 50
  }
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
            height: shapeSize,
            aspectRatio: 1,
            borderRadius: shapeRadius,
          }}
        >
          <Icon name={icon} size={iconSize} />
        </StyledGradient>
      </StyledMotiPressable>
      {title && (
        <Text
          sx={{
            my: '$1',
            fontSize: 13,
            fontWeight: 'bold',
            flexWrap: 'nowrap',
          }}
        >
          {title}
        </Text>
      )}
    </View>
  )
}

const StyledMotiPressable = styled(MotiPressable)(() => ({
  alignItems: 'center',
}))

const StyledGradient = styled(Gradient)(() => ({
  borderWidth: 2,
  borderColor: '$PaleBlue',
}))

export default IconAction
