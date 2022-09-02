import { NavigationState } from '@react-navigation/native'

/**
 * Solution comes from here to get url path eg: /games
 * https://github.com/nandorojo/solito/pull/45
 *
 */
export const getCurrentNavigationRoute = (
  navigationState: NavigationState,
  type: 'path' | 'name' = 'path'
) => {
  const navigationRoutes = navigationState?.routes?.[navigationState?.index]

  if (type === 'path') {
    return (
      navigationRoutes?.path ??
      navigationRoutes?.params?.path ??
      navigationRoutes?.state?.routes[0]?.path ??
      '/'
    )
  } else {
    navigationRoutes?.name
  }
}
