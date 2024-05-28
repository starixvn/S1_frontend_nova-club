import { AGENT_TAB_HEIGHT } from 'agent/constant/sizes'
import { View } from 'dripsy'
import React from 'react'

export default function AgentTabBar({ children }) {
  return (
    <View
      style={[
        {
          height: AGENT_TAB_HEIGHT,
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
