import { useDrawer } from 'app/hooks/useDrawer'
import { Pressable, View, styled, useResponsiveValue } from 'dripsy'
import { MotiView, useAnimationState } from 'moti'
import React, { memo, useEffect, useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import LazyDrawerContent from './LazyDrawerContent'

// TODOƒ
/* Overlay */
export default function Drawer({ children }) {
  const { width, height } = useWindowDimensions()
  const drawerWidth = Math.min(300, width)
  const useDrawerAnimation = useAnimationState({
    from: { translateX: width },
    //multiplier should opposite with drawer container width
    toggle: { translateX: width - drawerWidth + 5 },
  })
  const isDesktop = useResponsiveValue([false, false, false, true])
  const { isOpen, toggleDrawer } = useDrawer()
  const [offsetTop, setOffsetTop] = useState(0)

  useEffect(() => {
    if (Platform.OS === 'web') {
      setOffsetTop(document.documentElement.scrollTop)
    }
    if (isOpen) {
      useDrawerAnimation.transitionTo('toggle')
      Platform.OS === 'web' &&
        document.documentElement.classList.add('overflow-hidden')
    } else {
      useDrawerAnimation.transitionTo('from')
      Platform.OS === 'web' &&
        document.documentElement.classList.remove('overflow-hidden')
    }
  }, [isOpen, useDrawerAnimation, width, isDesktop])

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
        offsetTop={offsetTop}
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
  ({ offsetTop, width }: { offsetTop: number; width: number }) => ({
    position: 'absolute',
    width,
    height: '100%',
    // backgroundColor: 'red',
    zIndex: 1,
    top: offsetTop,
  })
)

export const MemoDrawer = memo(Drawer)
