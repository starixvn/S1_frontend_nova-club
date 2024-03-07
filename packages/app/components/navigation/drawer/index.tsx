import { useDrawer } from 'app/hooks/useDrawer'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { HEADER_HEIGHT } from 'utils/constant'
import { Pressable, View, styled } from 'dripsy'
import { MotiView, useAnimationState } from 'moti'
import React, { memo, useEffect, useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import LazyDrawerContent from './LazyDrawerContent'

// TODOƒ
/* Overlay */
export default function Drawer({ children }) {
  const { width, height } = useWindowDimensions()
  const { top, bottom } = useSafeArea()
  const drawerWidth = Math.min(250, width)
  const drawerHeight = height - HEADER_HEIGHT - top
  const useDrawerAnimation = useAnimationState({
    from: { translateX: drawerWidth },
    //multiplier should opposite with drawer container width
    toggle: { translateX: 0 },
  })
  const isDesktop = useIsDesktop()
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
        width={drawerWidth}
        height={drawerHeight}
        offsetTop={top}
        state={useDrawerAnimation}
        transition={{ type: 'timing' }}
      >
        <LazyDrawerContent />
      </DrawerContainer>
    </View>
  )
}

const DrawerOverlay = styled(Pressable)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.2)',
  zIndex: 1,
})

const DrawerContainer = styled(MotiView)(
  ({
    offsetTop,
    width,
    height,
  }: {
    offsetTop: number
    width: number
    height: number
  }) => ({
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    width,
    height: '100%',
    zIndex: 1,
    top: offsetTop,
    right: 0,
    bg: '$primary.500',
    // bg: 'blue',
  })
)

export const MemoDrawer = memo(Drawer)
