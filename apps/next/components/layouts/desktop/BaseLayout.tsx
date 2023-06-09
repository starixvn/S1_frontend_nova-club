import React, { ReactNode } from 'react'
import { Text } from 'react-native'

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Text style={{ color: 'white' }}> DEsktop</Text>
      {children}
    </div>
  )
}
