import { Route } from 'app/navigation/type'
import { DesktopRoute } from './NavigationType'

export function routeToDesktopRoute(route: Route): DesktopRoute {
  return {
    ...route,
  } as DesktopRoute
}
