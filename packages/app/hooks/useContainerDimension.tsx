import { useDripsyTheme } from 'dripsy'
import { Platform, ScaledSize, useWindowDimensions } from 'react-native'

const useContainerDimension: () => ScaledSize = () => {
  const dimension = useWindowDimensions()
  const { theme } = useDripsyTheme()

  return {
    ...dimension,
    width:
      Platform.OS === 'web'
        ? Math.min(
            document.getElementsByTagName('body')[0]?.clientWidth ??
              dimension.width,
            theme.sizes.container
          )
        : dimension.width,
    // Platform.select({
    //   web: Math.min(dimension.width, theme.sizes.container),
    // }) ?? dimension.width,
  }
}

export default useContainerDimension
