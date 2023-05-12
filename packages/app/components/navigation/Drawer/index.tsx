import { Pressable, Text, View, styled } from 'dripsy'
import React, { useContext, useEffect } from 'react'
import DrawerContent from './DrawerContent'
import { MotiView, useAnimationState } from 'moti/build'
import { useWindowDimensions } from 'react-native'
import { DrawerContext, useDrawer } from './DrawerProvider'

// TODOƒ
/* Overlay */
export default function Drawer({ children }) {
  const { width } = useWindowDimensions()
  const useDrawerAnimation = useAnimationState({
    from: { translateX: width },
    //multiplier should opposite with drawer container width
    toggle: { translateX: width * 0.4 },
  })
  const { isOpen, toggleDrawer } = useDrawer()

  useEffect(() => {
    if (isOpen) {
      useDrawerAnimation.transitionTo('toggle')
    } else {
      useDrawerAnimation.transitionTo('from')
    }
  }, [isOpen])

  return (
    <View sx={{ flex: 1 }}>
      {children}
      {isOpen && <DrawerOverlay onPress={() => toggleDrawer()} />}
      <DrawerContainer
        state={useDrawerAnimation}
        transition={{ type: 'timing' }}
      >
        <DrawerContent />
      </DrawerContainer>
    </View>
  )
}

const DrawerOverlay = styled(Pressable)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
})

const DrawerContainer = styled(MotiView)({
  position: 'absolute',
  width: '60%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.3)',
})
