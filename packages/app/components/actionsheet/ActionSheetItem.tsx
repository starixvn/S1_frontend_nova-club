import { View } from 'dripsy'
import React from 'react'
import RoundedIcon from '../RoundedIcon'

type ActionSheetItemProps = {
  icon: string
  onPress: () => void
}

const ActionSheetItem = ({ icon, onPress }: ActionSheetItemProps) => {
  return (
    <View sx={{ alignItems: 'center', width: '25%' }}>
      <RoundedIcon
        size="lg"
        icon={icon}
        onPress={onPress}
        containerStyle={{
          m: '$0a',
        }}
        imageStyle={{
          bg: '$primary',
        }}
      />
    </View>
  )
}

export default ActionSheetItem
