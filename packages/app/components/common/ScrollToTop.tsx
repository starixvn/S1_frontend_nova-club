import BouncePressable from 'app/pressable/BouncePressable'
import React, { useEffect, useRef } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { AnimatePresence, motify } from 'moti'
import IconButton from '../form/IconButton'
import { styled } from 'dripsy'

type TriggerRefType =
  | InstanceType<typeof FlatList>
  | InstanceType<typeof ScrollView>

export type ScrollToTopProps = React.ComponentProps<typeof IconButton> & {
  triggerRef: React.RefObject<TriggerRefType>
  bottom?: string | number
  right?: string | number
  showButton: boolean
}

const ANIMATION_DURATION = 200 // ms

const ScrollToTop = ({
  triggerRef,
  bottom,
  right,
  showButton,
  ...restProps
}: ScrollToTopProps) => {
  // const animationViewRef = useRef<Animatable.View & View>(null);

  const scrollToTop = () => {
    if (!triggerRef?.current) {
      console.warn('`scrollToTop` rootView undefined')
      return
    }

    if (triggerRef.current instanceof FlatList) {
      triggerRef.current.scrollToOffset({ offset: 0, animated: true })
    } else {
      triggerRef.current?.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  useEffect(() => {
    // if (showButton) {
    //   animationViewRef.current?.zoomIn?.(ANIMATION_DURATION);
    //   return;
    // }
    // animationViewRef.current?.zoomOut?.(ANIMATION_DURATION);
    console.log('showButton', showButton)
  }, [showButton])

  return (
    <AnimatePresence>
      {showButton && (
        <StyledIconButton
          size={48}
          onPress={scrollToTop}
          name="cross"
          sx={{
            bottom: bottom ?? 25,
            right: right ?? 10,
          }}
          {...restProps}
        />
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop

// const MotifiedIconButton = motify(IconButton)()
const StyledIconButton = styled(IconButton)(() => ({
  marginRight: 10,
  borderRadius: 50,
  backgroundColor: '#fab617',
  color: '#fff',
  position: 'absolute',
}))
