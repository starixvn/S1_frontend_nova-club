import Button from 'agent/components/Button'
import Icon from 'agent/components/Icon'
import useContainerDimension from 'app/hooks/useContainerDimension'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { Platform, useWindowDimensions } from 'react-native'

const AgentFloatingContent = ({ onPress }) => {
  const { width } = useWindowDimensions()
  const { width: containerWidth, height: containerHeight } =
    useContainerDimension()
  const { theme } = useDripsyTheme()
  const { bottom } = useSafeArea()

  const iconSize = Math.min(110, width * 0.2)

  return (
    <View
      sx={{
        zIndex: 9,
        right:
          Math.max(12, (width - theme.sizes.container) / 2) +
          Math.max(containerWidth * 0.2 - iconSize, 0) / 2,
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        bottom: bottom,
        alignItems: 'center',
      }}
    >
      <Button
        onPress={onPress}
        sx={{
          width: 50,
          height: 50,
          borderRadius: 150,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        contentProps={{ sx: {} }}
      >
        <Icon name="search" size={24} />
      </Button>
    </View>
  )
}

export default AgentFloatingContent
