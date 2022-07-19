import { ContextualComponentType } from 'app/navigation/web/ContextualNavigation'

const useContextualRouting: () => {
  returnHref: string
  makeContextualHref: (to: ContextualComponentType, params?: any) => string
} = function () {
  return {
    makeContextualHref: (to) => '',
    returnHref: '',
  }
}

export default useContextualRouting
