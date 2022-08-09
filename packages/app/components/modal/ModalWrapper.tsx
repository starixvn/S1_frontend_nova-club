import useContainerDimension from 'app/hooks/useContainerDimension'
import { Sx, View } from 'dripsy'
import React from 'react'

interface ModalWrapperProps {
  children?: React.ReactNode
  sx?: Sx
}

const ModalWrapper = ({ children, sx }: ModalWrapperProps) => {
  const { width } = useContainerDimension()
  return <View sx={{ width, p: '$4', ...sx }}>{children}</View>
}

export default ModalWrapper
