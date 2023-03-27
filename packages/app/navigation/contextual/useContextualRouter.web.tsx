import Cookies from 'js-cookie'
import { useRouter } from 'solito/router'

// type NavigateTo = ContextualComponentType | string
function useContextualRouter() {
  const router = useRouter()

  // function setContextualUrl(urlInstance: URL, uri: string): URL {
  //   const dynamicComponent = ContextualComponents[uri]
  //   if (dynamicComponent) {
  //     urlInstance.searchParams.set(window.location.pathname, uri)
  //     urlInstance.searchParams.set('returnHref', window.location.pathname)
  //   } else {
  //     urlInstance.pathname = uri
  //     urlInstance.search = ''
  //   }

  //   return urlInstance
  // }

  // function appendParams(urlInstance: URL, params: any): URL {
  //   Object.keys(params).forEach((v) => {
  //     urlInstance.searchParams.set(v, params[v])
  //   })

  //   return urlInstance
  // }

  function push(
    url: string,
    params?: any,
    options?: {
      as?: string
    }
  ) {
    // const urlInstance = new URL(
    //   decodeURIComponent(window.history.state.url),
    //   window.location.origin
    // )

    // setContextualUrl(urlInstance, url as string)

    // Cookies.set('contextualNav', urlInstance.search)

    // if (params) appendParams(urlInstance, params)
    router.push({
      pathname: url,
      query: params,
    })
  }

  function replace(
    url: string,
    params?: any,
    options?: {
      shallow?: boolean
      as?: string
    }
  ) {
    // if (options?.shallow) {
    //   const urlInstance = new URL(
    //     decodeURIComponent(window.history.state.url),
    //     window.location.origin
    //   )

    //   const lastOpener = urlInstance.searchParams.get('returnHref')
    //   if (lastOpener) {
    //     urlInstance.searchParams.delete(lastOpener)
    //     // need to delete another query key, but i forgot which 1.
    //   }

    //   setContextualUrl(urlInstance, url as string)
    //   if (params) appendParams(urlInstance, params)

    //   router.replace(urlInstance.toString(), options?.as ?? url)
    // } else
    router.replace({
      pathname: url,
      query: params,
    })
  }

  function back() {
    // const urlInstance = new URL(
    //   decodeURIComponent(window.history.state.url),
    //   window.location.origin
    // )

    // const lastOpener = urlInstance.searchParams.get('returnHref')
    // if (lastOpener) {
    //   router.back()
    // } else {
    //   // This handles on refresh on nested path, pressing back without returnHref will still able to router.back()
    //   const searchParam = Cookies.get('contextualNav')
    //   if (searchParam) {
    //     const searchParamObj = new URLSearchParams(searchParam)

    //     let handled = false
    //     searchParamObj.forEach((v, k) => {
    //       if (window.location.pathname === v) {
    //         router.back()
    //         handled = true
    //       }
    //     })

    //     if (handled) {
    //       return
    //     }
    //   }

    //   router.replace('/')
    // }

    router.back()
  }

  function clear() {
    // TODO clear Contextual Stacks
  }

  return {
    back,
    push,
    replace,
    clear,
  }
}

export default useContextualRouter
