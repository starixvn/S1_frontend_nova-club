import useLocalization from 'app/provider/localization'
import { SxProp, Text, View } from 'dripsy'
import React from 'react'

export type HeaderProps = {
  data: {
    label: string
    textStyle?: SxProp
  }[]
}

const HistoryHeader = ({ data }: HeaderProps) => {
  const { t } = useLocalization()
  return (
    <View
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        py: '$2',
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
            numberOfLines={1}
            sx={{
              ...item.textStyle,
            }}
          >
            {t(item.label)}
          </Text>
        ))}
    </View>
  )
}

export default HistoryHeader
