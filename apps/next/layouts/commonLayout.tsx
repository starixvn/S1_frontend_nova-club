import BottomNavigation from 'app/navigation/BottomNavigation'
import MainHeader from 'app/navigation/MainHeader'
import React from 'react'

const CommonLayout = (children: React.ReactNode) => {
  return (
    <>
      <MainHeader navigation={undefined} title="Web header" />
      {children}
      <BottomNavigation />
    </>
  )
}

export default CommonLayout
