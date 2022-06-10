import BottomNavigation from 'app/navigation/BottomNavigation'
import MainHeader from 'app/navigation/MainHeader'
import React from 'react'
import { View } from 'dripsy'

const TabLayout = ({ children }) => {
  return (
    <View
      sx={{
        minHeight: '100vh',
        marginTop: 51,
        marginBottom: 60,
      }}
    >
      <HeaderFloat />
      <View style={{ flex: 1 }}>{children}</View>
      <BottomTabFloat />
    </View>
  )
}

const HeaderFloat = ({}) => {
  return (
    <View
      sx={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        maxWidth: 'container',
        top: 0,
      }}
    >
      <MainHeader />
    </View>
  )
}

const BottomTabFloat = () => {
  return (
    <View
      sx={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        bottom: 0,
        maxWidth: 'container',
      }}
    >
      <BottomNavigation />
    </View>
  )
}

export default TabLayout
