import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Text, View } from 'dripsy'
import React from 'react'

const MainHeader = ({
  navigation,
  title,
}: {
  navigation: any
  title: string
}) => {
  const { top } = useSafeArea()

  return (
    <View
      style={{
        backgroundColor: '#0D2035',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: top,
        paddingBottom: 10,
      }}
    >
      <Text style={{ color: 'white' }}>{title}</Text>
    </View>
  )
}

export default MainHeader
