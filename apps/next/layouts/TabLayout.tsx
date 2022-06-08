import BottomNavigation from 'app/navigation/BottomNavigation'
import MainHeader from 'app/navigation/MainHeader'
import React from 'react'
import { View } from 'dripsy'

const TabLayout = ({ children }) => {
  return (
    <View
      sx={{
        minHeight: '100vh',
        marginTop: 66,
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
      }}
    >
      <BottomNavigation />
    </View>
  )
}

export default TabLayout
