import { SxProp, View } from 'dripsy'
import React from 'react'
import RoundedIcon from '../RoundedIcon'

export type ActionSheetItemProps = {
  icon: string
  onPress: () => void
  containerStyle?: SxProp
  imageStyle?: SxProp
  itemWidth: number
}

const ActionSheetItem = ({
  icon,
  onPress,
  containerStyle,
  imageStyle,
  itemWidth,
}: ActionSheetItemProps) => {
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
