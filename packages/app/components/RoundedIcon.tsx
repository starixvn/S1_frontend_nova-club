import BouncePressable from 'app/pressable/BouncePressable'
import { styled, SxProp, View } from 'dripsy'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
import Image from './common/Image'

import { DripsyGradient, GradientList } from './Gradient'
import Icon from './Icon'

type RoundedIconProps = {
  size?: 'sm' | 'md' | 'lg'
  gradient?: GradientList
  icon: string | ImageSourcePropType
  sx?: SxProp
  containerStyle?: SxProp
  imageStyle?: SxProp
  onPress?: () => void
  disabled?: boolean
}

const RoundedIcon = ({
  size = 'md',
  gradient,
  icon,
  sx,
  containerStyle,
  imageStyle,
  onPress,
  disabled,
}: RoundedIconProps) => {
  let iconSize, shapeRadius, shapeSize

  switch (size) {
    case 'sm':
      iconSize = 25
      shapeRadius = 15
      shapeSize = 50
      break
    case 'md':
      iconSize = 33
      shapeSize = 66
      break
    case 'lg':
      iconSize = 60
      shapeSize = 90
      break

    default:
      iconSize = 42
      shapeSize = 72
      break
  }

  return (
    <BouncePressable onPress={onPress} sx={sx} disabled={disabled}>
      {gradient ? (
        <GradientContainer size={shapeSize}>
          <StyledGradient
            gradient={disabled ? 'grey' : gradient}
            size={shapeSize}
          >
            <Icon name={icon} size={iconSize} />
          </StyledGradient>
        </GradientContainer>
      ) : (
        <StyledView size={shapeSize} sx={{ ...containerStyle }}>
          <StyledImage
            resizeMode="contain"
            source={typeof icon === 'string' ? { uri: icon } : icon}
            sx={{ ...imageStyle }}
          />
        </StyledView>
      )}
    </BouncePressable>
  )
}

const GradientContainer = styled(View)(({ size }: { size: number }) => ({
  height: size,
  width: size,
  borderRadius: 15,
  borderWidth: 2,
  borderColor: '$PaleBlue',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: 1,
  overflow: 'hidden',
}))
const StyledGradient = styled(DripsyGradient)(({ size }: { size: number }) => ({
  height: size,
  width: size,
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledView = styled(View)(({ size }: { size: number }) => ({
  aspectRatio: 1,
  height: size,
  width: size,
  borderRadius: size * 0.25,
  borderWidth: 3,
  borderColor: '$PaleBlue',
  overflow: 'hidden',
}))

const StyledImage = styled(Image)(() => ({
  aspectRatio: 1,
  height: '100%',
  resizeMode: 'contain',
  bg: 'transparent',
}))

export default RoundedIcon
