import { useDripsyTheme } from 'dripsy'
import { Platform, ScaledSize, useWindowDimensions } from 'react-native'

const useContainerDimension: () => ScaledSize = () => {
  const dimension = useWindowDimensions()
  const { theme } = useDripsyTheme()

  return {
    ...dimension,
    width:
      Platform.select({
        web: Math.min(dimension.width, theme.sizes.container),
      }) ?? dimension.width,
  }
}

export default useContainerDimension
