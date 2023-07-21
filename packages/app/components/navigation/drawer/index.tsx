import { useDrawer } from 'app/hooks/useDrawer'
import { Pressable, View, styled } from 'dripsy'
import { MotiView, useAnimationState } from 'moti'
import React, { memo, useEffect } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import DrawerContent from './DrawerContent'

// TODOƒ
/* Overlay */
export default function Drawer({ children }) {
  const { width, height } = useWindowDimensions()
  const useDrawerAnimation = useAnimationState({
    from: { translateX: width },
    //multiplier should opposite with drawer container width
    toggle: { translateX: width * 0.4 },
  })
  const { isOpen, toggleDrawer } = useDrawer()

  useEffect(() => {
    if (isOpen) {
      useDrawerAnimation.transitionTo('toggle')
      Platform.OS === 'web' &&
        document.documentElement.classList.add('overflow-hidden')
    } else {
      useDrawerAnimation.transitionTo('from')
      Platform.OS === 'web' &&
        document.documentElement.classList.remove('overflow-hidden')
    }
  }, [isOpen, useDrawerAnimation, width])

  return (
    <View
      sx={{
        flex: 1,
        overflow: 'hidden',
      }}
    >
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
  zIndex: 1,
})

export const MemoDrawer = memo(Drawer)
