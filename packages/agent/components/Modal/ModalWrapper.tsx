import Text from 'agent/components/Text'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Sx, View } from 'dripsy'
import React from 'react'
import IconButton from '../Icon/IconButton'
interface ModalWrapperProps {
  title?: string
  children?: React.ReactNode
  onClose?: () => void
  sx?: Sx
}

const ModalWrapper = ({ title, children, onClose, sx }: ModalWrapperProps) => {
  const { width, height } = useContainerDimension()
  const { left, right } = useSafeArea() //Landscape
  return (
    <View
      sx={{
        width: Math.min(500, width * 0.9),
        borderRadius: 12,
        bg: 'white',
        overflow: 'hidden',
      }}
    >
      <View
        sx={{
          flexDirection: 'row',
          p: 12,
          justifyContent: 'center',
          alignItems: 'center',
          bg: '#D1D1D1',
          borderBottomWidth: 1,
          borderColor: '#A2A2A2',
        }}
      >
        <Text sx={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
        <IconButton
          size={24}
          name="add"
          color="black"
          onPress={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            transform: [{ rotateZ: '45deg' }],
          }}
        />
      </View>
      <View
        sx={{
          p: '$4',
          ...sx,
        }}
      >
        {children}
      </View>
    </View>
  )
}

export default ModalWrapper
