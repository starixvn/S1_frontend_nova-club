import Draggable from 'app/components/Draggable'
import { View } from 'dripsy'
import React from 'react'
import FloatingEuroCup from './FloatingEuroCup'
import dayjs from 'dayjs'

const DraggableFloatingMystery = () => {
  const hideEuroCup = dayjs().isAfter(dayjs('2024-07-24T04:00:00.000Z'))

  return hideEuroCup ? null : (
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
