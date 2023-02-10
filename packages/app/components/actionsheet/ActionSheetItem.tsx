import { SxProp, View } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import RoundedIcon from '../RoundedIcon'

export type ActionSheetItemProps = {
  icon: string
  onPress: () => void
  containerStyle?: SxProp
  imageStyle?: SxProp
}

const ActionSheetItem = ({
  icon,
  onPress,
  containerStyle,
  imageStyle,
}: ActionSheetItemProps) => {
  const { width } = useWindowDimensions()
  const itemWidth = Math.min(90, width * 0.25)
  const mergedContainerStyle = {
    ...{
      // m: '$0a',
    },
    ...containerStyle,
  }

  const mergedImageStyle = {
    ...{
      bg: '$primary',
    },
    ...imageStyle,
  }

  return (
    <View
      sx={{
        alignItems: 'center',
        width: itemWidth,
        m: '$1',
      }}
    >
      <RoundedIcon
        size="lg"
        icon={icon}
        onPress={onPress}
        containerStyle={mergedContainerStyle}
        imageStyle={mergedImageStyle}
      />
    </View>
  )
}

export default ActionSheetItem
