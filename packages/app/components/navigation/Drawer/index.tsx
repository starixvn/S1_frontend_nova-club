import { Pressable, View, styled } from 'dripsy'
import React from 'react'
import DrawerContent from './DrawerContent'

// TODO
/* Drawer Sliding */
/* Overlay */
export default function Drawer({ children }) {
  return (
    <View sx={{ flex: 1 }}>
      <DrawerOverlay />
      <DrawerContainer>
        <DrawerContent />
      </DrawerContainer>
      {children}
    </View>
  )
}

const DrawerOverlay = styled(Pressable)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
})

const DrawerContainer = styled(View)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
})
