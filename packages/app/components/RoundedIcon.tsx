import { Image, styled, SxProp, View } from 'dripsy'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

type RoundedIconProps = {
  size?: 'small' | 'medium'
  image: ImageSourcePropType
  containerStyle?: SxProp
  imageStyle?: SxProp
}

const ICON_SIZE_SMALL = 90
const ICON_SIZE_MEDIUM = 120

const RoundedIcon = ({
  size = 'medium',
  image,
  containerStyle,
  imageStyle,
}: RoundedIconProps) => {
  const iconSize = size === 'medium' ? ICON_SIZE_MEDIUM : ICON_SIZE_SMALL

  return (
    <StyledView size={iconSize} sx={{ ...containerStyle }}>
      <StyledImage source={image} sx={{ ...imageStyle }} />
    </StyledView>
  )
}

const StyledView = styled(View)(({ size }: { size: number }) => ({
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
