import { copyToClipboard } from 'app/utils'
import { SxProp, Text } from 'dripsy'
import { View } from 'dripsy'
import React from 'react'
import { Platform } from 'react-native'
import IconButton from './IconButton'

type CopyFieldProps = {
  label: string
  color?: string
  containerStyle?: SxProp
  textStyle?: SxProp
  isCopy?: boolean
}
const CopyField = ({
  label,
  color = 'white',
  containerStyle,
  textStyle,
  isCopy,
}: CopyFieldProps) => {
  return (
    <View
      sx={{ flexDirection: 'row', alignItems: 'center', ...containerStyle }}
    >
      <Text
        sx={{
          flex: 1,
          flexWrap: 'wrap',
          color,
          fontSize: 13,
          ...Platform.select({
            web: {
              wordBreak: 'break-word',
            },
          }),
          ...textStyle,
        }}
      >
        {label}
      </Text>
      {isCopy && (
        <IconButton
          name="copy"
          size={20}
          color={color}
          sx={{ ml: '$1' }}
          onPress={() => copyToClipboard(label)}
        />
      )}
    </View>
  )
}

export default CopyField
