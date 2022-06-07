import { Image, styled, View } from 'dripsy'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

type RoundedIconProps = {
  size?: 'small' | 'medium'
  image: ImageSourcePropType
}

const ICON_SIZE_SMALL = 90
const ICON_SIZE_MEDIUM = 120

const RoundedIcon = ({ size = 'medium', image }) => {
  const iconSize = size === 'medium' ? ICON_SIZE_MEDIUM : ICON_SIZE_SMALL

  return (
    <StyledView size={iconSize}>
      <StyledImage source={image} />
    </StyledView>
  )
}

const StyledView = styled(View)(({ size }: { size: number }) => ({
  height: size,
  borderRadius: size * 0.25,
  borderWidth: 3,
  borderColor: '$PaleBlue',
  overflow: 'hidden',
}))

const StyledImage = styled(Image)(() => ({
  aspectRatio: 1,
  height: '100%',
}))

export default RoundedIcon
