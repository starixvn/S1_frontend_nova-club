import { Pressable } from 'dripsy'
import React from 'react'

const FloatingOverlay = ({ isVisible, onToggle }) => {
  return (
    isVisible && (
      <>
        <Pressable
          onPress={onToggle}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
      </>
    )
  )
}

export default FloatingOverlay
