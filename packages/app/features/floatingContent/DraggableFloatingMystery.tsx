import useIsDesktop from 'app/hooks/useIsDesktop'
import { View } from 'dripsy'
import React, { useRef } from 'react'
import FloatingMystery from './FloatingMystery'
import Draggable from 'app/components/Draggable'

const DraggableFloatingMystery = () => {
  const isDekstop = useIsDesktop()

  return (
    <View
      sx={{
        position: 'absolute',
        right: 12,
        bottom: 180,
        zIndex: 2,
      }}
    >
      <Draggable>
        <FloatingMystery disabled={false} />
      </Draggable>
    </View>
  )
}

export default DraggableFloatingMystery
