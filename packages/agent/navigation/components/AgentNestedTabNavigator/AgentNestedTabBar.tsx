import { DripsyGradient } from 'app/components/Gradient'
import React from 'react'

export default function AgentNestedTabBar({ children }) {
  return (
    <DripsyGradient
      colors={['rgb(224,237,254)', '#ffffff']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 16,
        },
      ]}
    >
      {children}
    </DripsyGradient>
  )
}
