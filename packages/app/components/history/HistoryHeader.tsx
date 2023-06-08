import { Text, View } from 'dripsy'
import React from 'react'
import { DripsyGradient } from '../Gradient'

export type HeaderProps = {
  data: {
    label: string
    columnWidth: number
  }[]
}

const HistoryHeader = ({ data }: HeaderProps) => {
  return (
    <View
      sx={{
        flexDirection: 'row',
        // borderTopLeftRadius: 16,
        // borderTopRightRadius: 16,
        alignItems: 'center',
        py: '$3',
        px: '$3',
        textAlign: 'center',
        bg: '$primary.300',
        borderTopWidth: 1,
        borderColor: '$primary.50',
      }}
    >
      {data &&
        data.map((item, index) => (
          <Text
            key={`${index} ${item.label}`}
            sx={{
              flex: item.columnWidth,
              alignSelf: 'stretch',
              textAlign: index === 0 ? 'left' : 'center',
            }}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        ))}
    </View>
  )
}

export default HistoryHeader
