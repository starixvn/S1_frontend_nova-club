import {
  NavigationContext,
  NavigationState,
  useNavigation,
} from '@react-navigation/native'
import { useContext } from 'react'

export default function useCurrentPath() {
  const navigation = useNavigation()
  const navigationContext = useContext(NavigationContext)

  const navigationState = navigationContext
    ? navigationContext.getState()
    : navigation.getState()
  const activeState = getActiveRouteState(navigationState)

  return {
    path: activeState.routes[activeState.index]?.path,
    name: activeState.routes[activeState.index]?.name,
  }
}

const getActiveRouteState = function (route: NavigationState): NavigationState {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route
  }

  const childActiveRoute = route.routes[route.index]?.state as NavigationState

  if (childActiveRoute) return getActiveRouteState(childActiveRoute)
  else return route
}
