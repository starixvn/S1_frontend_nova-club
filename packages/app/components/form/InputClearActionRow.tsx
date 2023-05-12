import { Row } from 'dripsy'
import React from 'react'
import IconButton from '../IconButton'

export default function InputClearActionRow({
  isClearable = false,
  onPress,
  children,
}) {
  return (
    <Row sx={{ alignItems: 'center', gap: '$2' }}>
      {isClearable && (
        <IconButton size={15} name="cross" color="$secondary.500" onPress={onPress} />
      )}
      {children}
    </Row>
  )
}
