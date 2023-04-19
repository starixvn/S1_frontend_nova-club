import { TAB_HEIGHT } from 'app/constant/sizes'
import { View } from 'dripsy'
import React from 'react'

export default function AgentTabBar({ children }) {
  return (
    <View
      style={[
        {
          height: TAB_HEIGHT * 1.25,
          flexDirection: 'row',
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          zIndex: 2,
          paddingHorizontal: 4,
        },
      ]}
    >
      {children}
    </View>
  )
}
