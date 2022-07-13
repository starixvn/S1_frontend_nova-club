import { View } from 'dripsy'
import React from 'react'

const ModalWrapper = ({ children, sx }) => {
  return <View sx={{ p: '$4', ...sx }}>{children}</View>
}

export default ModalWrapper
