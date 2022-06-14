import BottomNavigation from 'app/navigation/BottomNavigation'
import MainHeader from 'app/navigation/MainHeader'
import React, { FC } from 'react'
import { View } from 'dripsy'
import Header from 'app/components/common/Header'

export interface ModalLayoutProps {
  children: React.ReactElement
  title: string
}
const ModalLayout: FC<ModalLayoutProps> = ({ children, title }) => {
  return (
    <View
      sx={{
        minHeight: '100vh',
        marginTop: 51,
        marginBottom: 60,
      }}
    >
      <HeaderFloat title={title} />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  )
}

const HeaderFloat = ({ title }: { title: string }) => {
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
      <Header title={title} />
    </View>
  )
}

export default ModalLayout
