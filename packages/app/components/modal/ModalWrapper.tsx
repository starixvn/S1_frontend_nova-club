import { Sx, View } from 'dripsy'
import React from 'react'
import { useWindowDimensions } from 'react-native'

interface ModalWrapperProps {
  children?: React.ReactNode
  sx?: Sx
}

const ModalWrapper = ({ children, sx }: ModalWrapperProps) => {
  const { width: WindowWidth } = useWindowDimensions()
  // const { left, right } = useSafeArea() //Landscape
  return (
    <View
      sx={{
        // p: '$4',
        width: Math.min(800, WindowWidth * 0.8),
        justifyContent: 'center',
        ...sx,
      }}
    >
      {children}
    </View>
  )
}

export default ModalWrapper
