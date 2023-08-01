import { DripsyGradient } from 'app/components/Gradient'
import React from 'react'
import { Platform } from 'react-native'

export default function AgentNestedTabBar({ children }) {
  return (
    <DripsyGradient
      gradient="agentContent"
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        {
          paddingTop: Platform.OS === 'web' ? 35 : 24,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingBottom: 16,
        },
      ]}
    >
      {children}
    </DripsyGradient>
  )
}
