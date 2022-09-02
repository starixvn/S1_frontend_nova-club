import { NavigationContext } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/native'
import { ContextualComponentType } from 'app/navigation/web/ContextualNavigation'
import { getCurrentNavigationRoute } from 'app/utils/navigation'
import { useContext } from 'react'

const useContextualRouting: () => {
  returnHref: string
  makeContextualHref: (to: ContextualComponentType, params?: any) => string
} = function () {
  const navigationContext = useContext(NavigationContext)
  const navigation = useNavigation()

  const navigationState = navigationContext
    ? navigationContext.getState()
    : navigation.getState()

  return {
    makeContextualHref: (to) => '',
    returnHref: getCurrentNavigationRoute(navigationState),
  }
}

export default useContextualRouting
