import { Text } from 'dripsy'
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
    <DripsyGradient
      gradient="PaleBlue"
      sx={{
        flexDirection: 'row',
        backgroundColor: '$darkNavyBlue',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomColor: '$lightNavyBlue',
        borderBottomWidth: 1,
        alignItems: 'center',
        py: '$4',
        px: '$3',
        textAlign: 'center',
        minHeight: 55,
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
    </DripsyGradient>
  )
}

export default HistoryHeader
