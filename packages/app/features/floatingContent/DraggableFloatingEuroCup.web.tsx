import useIsDesktop from 'app/hooks/useIsDesktop'
import { View } from 'dripsy'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import FloatingEuroCup from './FloatingEuroCup'

const DraggableFloatingMystery = () => {
  const [isDragging, setIsDragging] = useState(false)
  const isDekstop = useIsDesktop()

  const handleStart = () => {
    setIsDragging(true)
  }
  const handleStop = () => {
    // delay to prevent directly enable click after stop dragging
    setTimeout(() => {
      setIsDragging(false)
    }, 300)
  }

  return (
    <Draggable onDrag={handleStart} onStop={handleStop}>
      <View
        nativeID="outer-floating"
        sx={{
          position: isDekstop ? 'fixed' : 'absolute',
          left: isDekstop ? 36 : undefined,
          right: isDekstop ? undefined : 23,
          bottom: isDekstop ? 150 : 250,
          zIndex: 2,
        }}
      >
        <FloatingEuroCup disabled={isDragging} />
      </View>
    </Draggable>
  )
}

export default DraggableFloatingMystery
