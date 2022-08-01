import BouncePressable from 'app/pressable/BouncePressable'
import { Image, styled, SxProp, View } from 'dripsy'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { DripsyGradient, GradientList } from './Gradient'
import Icon from './Icon'

type RoundedIconProps = {
  size?: 'sm' | 'md' | 'lg'
  gradient?: GradientList
  icon: string | ImageSourcePropType
  containerStyle?: SxProp
  imageStyle?: SxProp
  onPress?: () => void
}

const RoundedIcon = ({
  size = 'md',
  gradient,
  icon,
  containerStyle,
  imageStyle,
  onPress,
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
    <BouncePressable onPress={onPress}>
      {gradient ? (
        <StyledGradient gradient={gradient} size={shapeSize}>
          <Icon name={icon} size={iconSize} />
        </StyledGradient>
      ) : (
        <StyledView size={shapeSize} sx={{ ...containerStyle }}>
          <StyledImage source={icon} sx={{ ...imageStyle }} />
        </StyledView>
      )}
    </BouncePressable>
  )
}

const StyledGradient = styled(DripsyGradient)(({ size }: { size: number }) => ({
  height: size,
  width: size,
  borderRadius: size * 0.25,
  borderWidth: 2,
  borderColor: '$PaleBlue',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: 1,
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
  bg: 'white',
}))

export default RoundedIcon
