import { StackActions, useNavigation } from '@react-navigation/native'
import { useRouter } from 'solito/router'
import { ContextualComponentType } from './ContextualComponents'
// use String instead of string to prevent typescript converting  "ContextualComponentType | string" => string
type NavigateTo = ContextualComponentType | String

function useContextualRouter() {
  const router = useRouter()
  const navigation = useNavigation()

  function push(
    url: NavigateTo,
    params?: any,
    options?: {
      as?: string
    }
  ) {
    // old solito is using 2nd param as app's params
    router.push(url as string, {
      pathname: url as string,
      query: params,
    })
  }

  function replace(
    url: NavigateTo,
    params?: any,
    options?: {
      as?: string
      shallow?: boolean
    }
  ) {
    router.replace(url as string, {
      pathname: url as string,
      query: params,
    })
  }

  function back() {
    if (navigation.canGoBack()) {
      router.back()
    } else router.replace('/')
  }

  function clear() {
    navigation.dispatch(StackActions.popToTop())
  }

  return {
    back,
    push,
    replace,
    clear,
  }
}

export default useContextualRouter
