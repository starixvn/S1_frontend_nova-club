import React from 'react'
import { View, Text } from 'dripsy'

export default function ImportantNotice() {
  return (
    <View sx={{ bg: '$primary.200', my: 20, borderRadius: 20, p: '$3' }}>
      <Text>Important Notice</Text>
    </View>
  )
}
