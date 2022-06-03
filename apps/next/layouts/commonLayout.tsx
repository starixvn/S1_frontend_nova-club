import { View, Text } from 'react-native'
import React from 'react'
import MainHeader from 'app/navigation/MainHeader'
import BottomNavigation from 'app/navigation/BottomNavigation'

const commonLayout = (children: React.ReactNode) => {
  return (
    <>
      <MainHeader navigation={undefined} title="Web header" />
      {children}
      <BottomNavigation />
    </>
  )
}

export default commonLayout
