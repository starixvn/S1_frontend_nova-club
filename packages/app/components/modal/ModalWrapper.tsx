import useContainerDimension from 'app/hooks/useContainerDimension'
import { View } from 'dripsy'
import React from 'react'

const ModalWrapper = ({ children, sx }) => {
  const { width } = useContainerDimension()
  return <View sx={{ width, p: '$4', ...sx }}>{children}</View>
}

export default ModalWrapper
