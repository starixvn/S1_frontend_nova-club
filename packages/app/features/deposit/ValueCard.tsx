import { Image, styled, Text, View } from 'dripsy'
import React from 'react'
import {
  StyleProp,
  StyleSheetProperties,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native'

type ValueCardProps = {
  item: string
  isActive?: boolean
  containerStyle?: StyleProp<ViewStyle>
  onPress: (string) => void
}

const ValueCard = ({
  item,
  isActive = false,
  containerStyle,
  onPress,
}: ValueCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={containerStyle}>
      <StyledView isActive={isActive}>
        {typeof item === 'string' ? (
          <Text>{item}</Text>
        ) : (
          <StyledImage source={item.logo} />
        )}
      </StyledView>
    </TouchableOpacity>
  )
}

const StyledView = styled(View)(({ isActive }: { isActive: boolean }) => ({
  height: 40,
  borderColor: '$border2',
  borderWidth: isActive ? 3 : 1,
  borderRadius: 50,
  bg: isActive ? '#12304D' : '#091A2A',
  justifyContent: 'center',
  alignItems: 'center',
  m: '$2',
}))

const StyledImage = styled(Image)({
  height: 40,
  width: 80,
  resizeMode: 'contain',
})
export default ValueCard
