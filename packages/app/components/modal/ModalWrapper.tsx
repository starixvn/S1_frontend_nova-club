import useContainerDimension from 'app/hooks/useContainerDimension'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import isDesktop from 'app/utils/isDesktop'
import { ScrollView, Sx, View } from 'dripsy'
import React from 'react'

interface ModalWrapperProps {
  children?: React.ReactNode
  sx?: Sx
}

const ModalWrapper = ({ children, sx }: ModalWrapperProps) => {
  const { width, height } = useContainerDimension()
  const { left, right } = useSafeArea() //Landscape
  const desktop = isDesktop()
  return (
    <View
      sx={{
        p: '$4',
        width: Math.min(500, width * 0.9),
        justifyContent: 'center',
        ...sx,
      }}
    >
      {children}
    </View>
  )
}

export default ModalWrapper
