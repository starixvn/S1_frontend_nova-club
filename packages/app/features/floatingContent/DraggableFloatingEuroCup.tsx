import Draggable from 'app/components/Draggable'
import { View } from 'dripsy'
import React from 'react'
import FloatingEuroCup from './FloatingEuroCup'

const DraggableFloatingMystery = () => {
  return (
    <View
      sx={{
        position: 'absolute',
        bottom: 270,
        right: 24,
        zIndex: 2,
      }}
    >
      <Draggable>
        <FloatingEuroCup disabled={false} />
      </Draggable>
    </View>
  )
}

export default DraggableFloatingMystery
