import React from 'react'
import { Text } from 'react-native'

export default function DesktopBaseLayout({ children }) {
  return (
    <div>
      <Text style={{ color: 'white' }}> DEsktop</Text>
      {children}
    </div>
  )
}
