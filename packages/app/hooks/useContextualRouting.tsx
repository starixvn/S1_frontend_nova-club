import { NavigationContext } from '@react-navigation/core'
import { ContextualComponentType } from 'app/navigation/web/ContextualNavigation'
import { useContext } from 'react'

const useContextualRouting: () => {
  returnHref: string
  makeContextualHref: (to: ContextualComponentType, params?: any) => string
} = function () {
  const navigationContext = useContext(NavigationContext)
  const navigationState = navigationContext?.getState()

  /**
   * Solution comes from here to get url path eg: /games
   * https://github.com/nandorojo/solito/pull/45
   */
  const getPathName = () => {
    return (
      navigationState?.routes?.[navigationState?.index]?.path ??
      navigationState?.routes?.[navigationState?.index]?.params?.path ??
      navigationState?.routes?.[navigationState?.index]?.state?.routes[0]
        ?.path ??
      '/'
    )
  }

  return {
    makeContextualHref: (to) => '',
    returnHref: getPathName(),
  }
}

export default useContextualRouting
