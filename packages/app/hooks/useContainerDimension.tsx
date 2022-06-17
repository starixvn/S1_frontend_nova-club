import { useDripsyTheme } from 'dripsy'
import { ScaledSize, useWindowDimensions } from 'react-native'

const useContainerDimension: () => ScaledSize = () => {
  const dimension = useWindowDimensions()
  const { theme } = useDripsyTheme()

  return {
    ...dimension,
    width: Math.min(dimension.width, theme.sizes.container),
  }
}

export default useContainerDimension
