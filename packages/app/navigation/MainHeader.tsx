import { Text, View } from 'dripsy'
import React from 'react'

const MainHeader = ({
  navigation,
  title,
}: {
  navigation: any
  title: string
}) => {
  return (
    <View
      style={{
        backgroundColor: '#0D2035',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>{title}</Text>
    </View>
  )
}

export default MainHeader
