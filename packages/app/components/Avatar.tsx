import { Image, styled, Sx, SxProp, View } from 'dripsy'
import React, { FC } from 'react'
import { ImageSourcePropType, ViewProps } from 'react-native'

interface IAvatarProps extends ViewProps {
  source: ImageSourcePropType
}

const Avatar: FC<IAvatarProps> = ({ source, ...rest }) => {
  return (
    <StyledView {...rest}>
      <StyledImage source={source} resizeMode="contain" />
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  borderWidth: 2,
  borderColor: '$PaleBlue',
  borderRadius: 30,
  height: 60,
  width: 60,
  justifyContent: 'center',
  alignItems: 'center',
  bg: 'red',
  overflow: 'hidden',
}))

const StyledImage = styled(Image)({
  flex: 1,
  aspectRatio: 1,
  height: undefined,
  width: undefined,
})

export default Avatar
