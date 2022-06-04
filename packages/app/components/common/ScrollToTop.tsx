import React, { useEffect, useRef } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import IconButton from '../form/IconButton'

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
  const animationViewRef = useRef<Animatable.View & View>(null)

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
    if (showButton) {
      animationViewRef.current?.zoomIn?.(ANIMATION_DURATION)
      return
    }
    animationViewRef.current?.zoomOut?.(ANIMATION_DURATION)
  }, [showButton])

  return (
    <Animatable.View
      ref={animationViewRef}
      duration={150}
      style={[
        styles.floatingButton,
        {
          // bottom: bottom ?? getScaledSize(25),
          // right: right ?? getScaledSize(10),
          bottom: bottom ?? 25,
          right: right ?? 10,
        },
      ]}
    >
      <IconButton {...restProps} name="cross" size={28} onPress={scrollToTop} />
    </Animatable.View>
  )
}

export default ScrollToTop

const styles = StyleSheet.create({
  floatingButton: {
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: '#fab617',
    position: 'absolute',
  },
})
