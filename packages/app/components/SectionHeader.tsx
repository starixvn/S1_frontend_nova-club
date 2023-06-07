import { View } from 'dripsy'
import React from 'react'
import SectionLabel from './SectionLabel'

export default function SectionHeader({ icon, title, sx, ...rest }) {
  return (
    <View
      sx={{
        bg: '$primary.300',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        marginLeft: '$pagePadding',
        p: [6, '$2'],
        ...sx,
      }}
      {...rest}
    >
      <SectionLabel icon={icon} title={title} />
    </View>
  )
}
